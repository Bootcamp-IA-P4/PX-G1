from fastapi import FastAPI
from fast_api.routers import predictions
 

# Creamos la app FastAPI
app = FastAPI(title="Toxic Comment Classifier API")

app.include_router(predictions.router)

# Endpoint de prueba para ver si la API funciona
@app.get("/")
def read_root():
    return {"message": "API is working 🚀"}
