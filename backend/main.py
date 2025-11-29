from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from your Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://astonishing-youtiao-e25b20.netlify.app"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load your trained model once at startup
model = load_model("../trained_models/model.keras")

def preprocess_image(image: Image.Image):
    # Resize to model input size (example: 224x224)
    image = image.resize((224, 224))
    arr = np.array(image) / 255.0
    arr = np.expand_dims(arr, axis=0)  # shape (1, 224, 224, 3)
    return arr

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    arr = preprocess_image(image)
    prediction = model.predict(arr)[0][0]  # single float
    label = "AI-generated" if prediction < 0.5 else "Real"
    confidence = float(1 - prediction if label == "AI-generated" else prediction)


    return JSONResponse({
        "label": label,
        "confidence": confidence,
        "explanation": "Model inference completed successfully"
    })



