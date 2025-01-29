import torch
from diffusers import StableDiffusionPipeline
from PIL import Image

# Setup pipeline
model_id = "runwayml/stable-diffusion-v1-5"
device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = StableDiffusionPipeline.from_pretrained(model_id)
pipe = pipe.to(device)

# Set generation parameters
prompt = "a beautiful mountain landscape at sunset, high quality, 4k"
seed = 42
num_inference_steps = 50
guidance_scale = 7.5
eta = 0.5

# Generate image
images = pipe(
    prompt=prompt,
    num_inference_steps=num_inference_steps,
    guidance_scale=guidance_scale,
    eta=eta,
    generator=torch.Generator(device).manual_seed(seed),
).images

# Save the generated image
print(f"Prompt:\t{prompt}\nSeed:\t{seed}")
images[0].save("output.jpg")
print("Image saved as output.jpg")