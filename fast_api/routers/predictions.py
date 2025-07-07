from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import status
from fastapi import Depends
from fastapi.responses import JSONResponse
from schemas import PredictionRequest, PredictionResponse
from config import MODEL_VERSION 

router = APIRouter()

# Por ahora vamos a usar una predicción simulada (ficticia)
@router.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
def predict(request: PredictionRequest):
    text = request.text

    # Simulamos una "predicción"
    is_toxic = "hate" in text.lower() or "stupid" in text.lower()
    model_version = "v1.0-mock"

    return PredictionResponse(
        text=text,
        is_toxic=is_toxic,
        model_version=MODEL_VERSION
    )
