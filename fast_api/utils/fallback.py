import json
import os
from datetime import datetime

FALLBACK_FILE = "pending_predictions.json"

def save_to_fallback(prediction: dict):
    """Guarda una predicción en un archivo JSON en caso de fallo de Supabase"""
    if not os.path.exists(FALLBACK_FILE):
        with open(FALLBACK_FILE, "w") as f:
            json.dump([], f)

    with open(FALLBACK_FILE, "r+") as f:
        data = json.load(f)
        prediction["saved_at"] = datetime.utcnow().isoformat()
        data.append(prediction)
        f.seek(0)
        json.dump(data, f, indent=2)