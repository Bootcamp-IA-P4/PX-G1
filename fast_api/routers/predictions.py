from fastapi import APIRouter, HTTPException
from typing import List

from ..schemas import PredictionRequest, PredictionResponse, PredictionRecord
from ..config import MODEL_VERSION
from ..supabase_client import supabase
from ..model_loader import predict_label

router = APIRouter()

# POST /predict
@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    text = request.text
    is_toxic = predict_label(text)

    if supabase:
        try:
            supabase.table("predictions").insert({
                "text": text,
                "is_toxic": is_toxic,
                "model_version": MODEL_VERSION
            }).execute()
        except Exception as e:
            print(f"❌ Error al guardar predicción en Supabase: {e}")
            raise HTTPException(status_code=500, detail="Error saving prediction")

    return PredictionResponse(
        text=text,
        is_toxic=is_toxic,
        model_version=MODEL_VERSION
    )

# GET /history
@router.get("/history", response_model=List[PredictionRecord])
def get_history(limit: int = 10):
    if not supabase:
        raise HTTPException(status_code=500, detail="Supabase not initialized")

    try:
        response = (
            supabase.table("predictions")
            .select("*")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return response.data or []
    except Exception as e:
        print(f"❌ Error al obtener historial: {e}")
        raise HTTPException(status_code=500, detail="Error querying Supabase")
