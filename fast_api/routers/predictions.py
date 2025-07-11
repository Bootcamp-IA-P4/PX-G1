from fastapi import APIRouter, HTTPException, Query
from typing import List

from ..schemas import PredictionRequest, PredictionResponse, PredictionRecord, YouTubeBatchPredictionResponse
from ..config import MODEL_VERSION
from ..supabase_client import supabase
from ..model_loader import predict_label_with_score
from ..utils.fallback import save_to_fallback
from ..utils.extract_youtube_comments import extract_comments

import logging
from logs.setup_loggers import setup_logging
setup_logging()

router = APIRouter()

# POST /predict
@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    text = request.text
    logging.info(f"Recibida solicitud de predicción: '{text}'")

    # Predicción con el modelo
    is_toxic, toxicity_score = predict_label_with_score(text)
    logging.debug(f"Resultado: is_toxic={is_toxic}, toxicity_score={toxicity_score}")

    # Diccionario de datos que se va a guardar
    prediction_data = {
        "text": text,
        "is_toxic": is_toxic,
        "toxicity_score": toxicity_score,
        "model_version": MODEL_VERSION
    }

    # Guardamos en Supabase si está disponible
    if supabase:
        try:
            supabase.table("predictions").insert(prediction_data).execute()
            logging.info("Predicción guardada en Supabase correctamente.")
        except Exception as e:
            logging.error(f"Error al guardar en Supabase: {e}")
            logging.warning("Guardando predicción localmente (fallback).")
            save_to_fallback(prediction_data)
    else:
        logging.warning("Supabase no inicializado. Guardando en fallback.")
        save_to_fallback(prediction_data)

    # Devolvemos la predicción al usuario
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
    
# POST /predict/youtube
@router.post("/predict/youtube", response_model=YouTubeBatchPredictionResponse)
def predict_youtube_comments(
    video_url: str,
    limit: int = Query(20, ge=1, le=100)
):
    try:
        comments = extract_comments(video_url, limit)
        predictions = [predict_label_with_score(comment) for comment in comments]
        is_toxic_list = [p[0] for p in predictions]
        scores = [p[1] for p in predictions]

        avg_score = sum(scores) / len(scores) if scores else 0.0
        any_toxic = any(is_toxic_list)

        return YouTubeBatchPredictionResponse(
            video_url=video_url,
            comments=comments,
            predictions=[
                PredictionResponse(
                    text=comments[i],
                    is_toxic=is_toxic_list[i],
                    toxicity_score=scores[i],
                    model_version=MODEL_VERSION
                ) for i in range(len(comments))
            ],
            average_toxicity_score=avg_score,
            any_toxic=any_toxic
        )
    except Exception as e:
        logging.error(f"❌ Error total: {e}")
        raise HTTPException(status_code=500, detail=f"Error extracting or predicting comments: {str(e)}")
