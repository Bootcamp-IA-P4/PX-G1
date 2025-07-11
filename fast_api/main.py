from fastapi import FastAPI
from fast_api.routers import predictions
from fastapi.middleware.cors import CORSMiddleware

import logging
from logs.setup_loggers import setup_logging
setup_logging()

# Creamos la app FastAPI
app = FastAPI(title="Toxic Comment Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictions.router)

# Endpoint de prueba para ver si la API funciona
@app.get("/")
def read_root():
    logging.info("Acceso a la raíz de la API")
    return {"message": "API is working 🚀"}
