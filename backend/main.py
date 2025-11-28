from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Load your trained model once at startup
model = load_model("my_ai_detector_model.h5")

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
    prediction = model.predict(arr)[0]

    # Example: binary classifier [real, ai]
    label = "AI-generated" if prediction[1] > prediction[0] else "Real"
    confidence = float(max(prediction))

    return JSONResponse({
        "label": label,
        "confidence": confidence,
        "explanation": "Model inference completed successfully"
    })
