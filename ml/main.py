from io import BytesIO
from typing import List

import torch
from fastapi import FastAPI, File, HTTPException, UploadFile, status
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification

MODEL_NAME = "Anwarkh1/Skin_Cancer-Image_Classification"

app = FastAPI(title="Skin Cancer Image Classification API")

processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()


def load_image(file: UploadFile) -> Image.Image:
    try:
        content = file.file.read()
        return Image.open(BytesIO(content)).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image file: {file.filename}",
        )


@app.post("/predict", tags=["Skin Cancer"])
async def predict_batch(images: List[UploadFile] = File(...)):
    if not images:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="No images uploaded"
        )

    pil_images = [load_image(img) for img in images]

    inputs = processor(images=pil_images, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=-1)

    results = []

    for prob in probs:
        preds = []

        for idx, score in enumerate(prob):
            preds.append({"label": model.config.id2label[idx], "score": float(score)})
        preds.sort(key=lambda x: x["score"], reverse=True)
        results.append(preds)

    return {"predictions": results}