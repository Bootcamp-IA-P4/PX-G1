from fastapi import FastAPI

# Creamos la app FastAPI
app = FastAPI(title="Toxic Comment Classifier API")

# Endpoint de prueba para ver si la API funciona
@app.get("/")
def read_root():
    return {"message": "API is working 🚀"}
