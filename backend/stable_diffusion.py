from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import os
from werkzeug.utils import safe_join
import mimetypes

app = Flask(__name__, static_folder='outputs')
# Configure CORS settings
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})





# Setup pipeline
model_id = "runwayml/stable-diffusion-v1-5"
device = "cuda" if torch.cuda.is_available() else "cpu"
pipe = StableDiffusionPipeline.from_pretrained(model_id)
pipe = pipe.to(device)

def generate_image(
    prompt,
    seed=42,
    num_inference_steps=50,
    guidance_scale=7.5,
    eta=0.5
):
    # Generate image
    images = pipe(
        prompt=prompt,
        num_inference_steps=num_inference_steps,
        guidance_scale=guidance_scale,
        eta=eta,
        generator=torch.Generator(device).manual_seed(seed),
    ).images

    # Create output directory if it doesn't exist
    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)
    
    # Save the generated image with prompt as filename
    # filename = f"{output_dir}/{seed}_{prompt[:30]}.jpg"
    filename_by_prompt = prompt.replace(" ", "_").replace(",", "").replace(".", "").replace(":", "").replace(";", "").replace("!", "").replace("?", "").replace("'", "").replace('"', "").replace("(", "").replace(")", "").replace("[", "").replace("]", "").replace("{", "").replace("}", "").replace("/", "").replace("\\", "")
    filename = f"{output_dir}/{seed}_{filename_by_prompt}.jpg"
    images[0].save(filename)
    return filename

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    
    prompt = data.get('prompt', "a beautiful mountain landscape at sunset, high quality, 4k")
    seed = data.get('seed', 42)
    num_inference_steps = data.get('num_inference_steps', 50)
    guidance_scale = data.get('guidance_scale', 7.5)
    eta = data.get('eta', 0.5)

    try:
        # Generate image
        image_path = generate_image(
            prompt=prompt,
            seed=seed,
            num_inference_steps=num_inference_steps,
            guidance_scale=guidance_scale,
            eta=eta
        )

        return jsonify({
            'status': 'success',
            'image_path': image_path,
            'parameters': {
                'prompt': prompt,
                'seed': seed
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/outputs/<path:filename>')
def serve_image(filename):
    try:
        file_path = safe_join(app.static_folder, filename)
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404

        mime_type, _ = mimetypes.guess_type(file_path)
        response = send_file(
            file_path,
            mimetype=mime_type or 'image/jpeg'
        )
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)