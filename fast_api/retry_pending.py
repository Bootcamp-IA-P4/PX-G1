import os
import sys
import json
import logging

# Añadir la raíz del proyecto al path para importar bien módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fast_api.supabase_client import supabase

FALLBACK_FILE = "pending_predictions.json"

# Configuración básica de logs
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def main():
    if not supabase:
        logging.error("Supabase no está disponible. Verifica tus credenciales y conexión.")
        return

    # Cargar predicciones pendientes
    if not os.path.exists(FALLBACK_FILE):
        logging.info("No hay archivo pending_predictions.json. Nada que reenviar.")
        return

    with open(FALLBACK_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            logging.error("El archivo pending_predictions.json está corrupto o mal formado.")
            return

    if not data:
        logging.info("No hay predicciones pendientes. El archivo está vacío.")
        return

    logging.info(f"Reintentando envío de {len(data)} predicciones...")

    failed = []
    for item in data:
        item.pop("saved_at", None)  # Por si existe
        try:
            supabase.table("predictions").insert(item).execute()
        except Exception as e:
            logging.error(f"Error al subir una predicción: {e}")
            failed.append(item)

    if failed:
        logging.warning(f"{len(failed)} predicciones no pudieron reenviarse.")
        with open(FALLBACK_FILE, "w") as f:
            json.dump(failed, f, indent=2)
        logging.info("Archivo pending_predictions.json actualizado con fallos restantes.")
    else:
        logging.info("Todas las predicciones reenviadas correctamente.")
        with open(FALLBACK_FILE, "w") as f:
            json.dump([], f)  # Limpiando archivo

if __name__ == "__main__":
    main()
