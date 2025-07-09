import os
import joblib
import logging
from logs.setup_loggers import setup_logging
setup_logging()

# Ruta a la carpeta final_model
BASE_PATH = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_PATH, "final_model")

# Cargar vectorizador y modelo
VECTORIZER_PATH = os.path.join(MODEL_DIR, "vectorizer_toxicidad_final.pkl")
MODEL_PATH = os.path.join(MODEL_DIR, "modelo_toxicidad_xgboost_final.pkl")

vectorizer = joblib.load(VECTORIZER_PATH)
model = joblib.load(MODEL_PATH)

def predict_label_with_score(text: str) -> tuple[bool, float]:
    """
    Devuelve una tupla (is_toxic, toxicity_score)
    """
    X = vectorizer.transform([text])
    
    # predict_proba() devuelve [[prob_no_toxic, prob_toxic]]
    proba = model.predict_proba(X)
    toxicity_score = float(proba[0][1]) 

    is_toxic = toxicity_score >= 0.5  
    logging.info(f"Predicción realizada para el texto: {text}")
    return is_toxic, toxicity_score
