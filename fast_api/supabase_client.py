import os
from dotenv import load_dotenv
from supabase import create_client, Client
import logging
from logs.setup_loggers import setup_logging

setup_logging()

# Cargar variables de entorno
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = None

# Validación defensiva: solo si URL y KEY existen y son válidas
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL.startswith("https://"):
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Conexión a Supabase establecida con éxito.")
    except Exception as e:
        supabase = None
        logging.error(f"❌ Error al conectar con Supabase: {e}")
else:
    supabase = None
    logging.warning("Variables de entorno de Supabase no válidas o no encontradas.")
