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

def predict_label(text: str) -> bool:
    X = vectorizer.transform([text])
    prediction = model.predict(X)
    logging.info(f"Predicción realizada para el texto: {text}")
    return bool(prediction[0])
