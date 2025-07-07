from fastapi import APIRouter
from ..schemas import PredictionRequest, PredictionResponse
from ..config import MODEL_VERSION
from ..supabase_client import supabase

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    text = request.text
    is_toxic = "hate" in text.lower() or "stupid" in text.lower()

    # Guardar en Supabase con el SDK
    if supabase:
        supabase.table("predictions").insert({
            "text": text,
            "is_toxic": is_toxic,
            "model_version": MODEL_VERSION
        }).execute()

    return PredictionResponse(
        text=text,
        is_toxic=is_toxic,
        model_version=MODEL_VERSION
    )
