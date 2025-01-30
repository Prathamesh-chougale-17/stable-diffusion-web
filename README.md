# Stable Diffusion Image Generator

A web application that generates images using Stable Diffusion AI model with a Nextjs frontend and Flask backend.

## Prerequisites

- Python 3.8 or higher
- Node 20 or higher
- Git

## Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Run the virtual environment builder script:

On Linux

```bash
chmod +x venvbuilder.sh
./venvbuilder.sh
```

On Windows run on (git bash)

```bash
./venvbuilder.sh
```

3. Start the Flask server:

```bash
python stable_diffusion.py
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend application will run on http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000/generate
2. Enter a prompt describing the image you want to generate
3. Adjust the generation parameters:
   - Seed: Controls randomization
   - Inference Steps: Higher values give better quality but take longer
4. Click "Generate Image" and wait for the result

## Features

- Text-to-image generation using Stable Diffusion
- Adjustable generation parameters
- Real-time image preview
- Error handling and loading states
- Responsive design

## Technical Details

### Frontend

- Built with Next.js 14+ (App Router)
- Uses Shadcn UI components
- React Hook Form for form management
- TypeScript for type safety

### Backend

- Flask server with CORS support
- Stable Diffusion pipeline from Hugging Face
- Image generation with customizable parameters
- Secure file serving

## License

MIT License
