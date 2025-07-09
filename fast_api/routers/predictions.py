from fastapi import APIRouter, HTTPException
from typing import List

from ..schemas import PredictionRequest, PredictionResponse, PredictionRecord
from ..config import MODEL_VERSION
from ..supabase_client import supabase
from ..model_loader import predict_label_with_score
from ..utils.fallback import save_to_fallback
import logging
from logs.setup_loggers import setup_logging
setup_logging()

router = APIRouter()

# POST /predict
@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    text = request.text
    logging.info(f"Recibida solicitud de predicción: '{text}'")

    is_toxic, toxicity_score = predict_label_with_score(text)
    logging.debug(f"Resultado de predicción: is_toxic={is_toxic} con toxicity_score={toxicity_score}")

    if supabase:
        try:
            supabase.table("predictions").insert({
                "text": text,
                "is_toxic": is_toxic,
                "toxicity_score": toxicity_score,
                "model_version": MODEL_VERSION
            }).execute()
            logging.info(f"Predicción guardada en Supabase correctamente. 'text': {text}, 'is_toxic': {is_toxic}, 'toxicity_score': {toxicity_score}")

        except Exception as e:
            logging.error(f"Error al guardar predicción en Supabase: {e}")
            logging.warning("Guardando predicción localmente como fallback.")
    
            # Preparamos el diccionario de predicción
            fallback_data = {
                "text": text,
                "is_toxic": is_toxic,
                "toxicity_score": toxicity_score,
                "model_version": MODEL_VERSION
            }

    save_to_fallback(fallback_data)


    return PredictionResponse(
        text=text,
        is_toxic=is_toxic,
        toxicity_score=toxicity_score,
        model_version=MODEL_VERSION
    )

# GET /history
@router.get("/history", response_model=List[PredictionRecord])
def get_history(limit: int = 10):
    logging.info(f"Solicitud de historial de predicciones, limit={limit}")

    if not supabase:
        logging.warning("Supabase no está inicializado")
        raise HTTPException(status_code=500, detail="Supabase not initialized")

    try:
        response = (
            supabase.table("predictions")
            .select("*")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        logging.info(f"{len(response.data or [])} registros recuperados del historial.")
        return response.data or []
    except Exception as e:
        logging.error(f"Error al obtener historial: {e}")
        print(f"❌ Error al obtener historial: {e}")
        raise HTTPException(status_code=500, detail="Error querying Supabase")
