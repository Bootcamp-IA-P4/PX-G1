import json
from supabase_client import supabase

FALLBACK_FILE = "pending_predictions.json"

if not supabase:
    print("❌ Supabase no disponible")
    exit()

try:
    with open(FALLBACK_FILE, "r") as f:
        data = json.load(f)

    for item in data:
        item.pop("saved_at", None)
        supabase.table("predictions").insert(item).execute()
    print(f"✅ Se reintentaron {len(data)} predicciones.")

    # Limpiar archivo si todo fue bien
    with open(FALLBACK_FILE, "w") as f:
        json.dump([], f)

except Exception as e:
    print(f"❌ Error al reenviar pendientes: {e}")
