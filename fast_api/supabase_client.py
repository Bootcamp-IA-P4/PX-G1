import os
from dotenv import load_dotenv
from supabase import create_client, Client
import logging
from logs.setup_loggers import setup_logging
setup_logging()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Conexión a Supabase establecida con éxito.")
    except Exception as e:
        print(f"❌ Error al conectar con Supabase: {e}")
        logging.error(f"Error al conectar con Supabase: {e}")
else:
    print("⚠️ Variables de entorno de Supabase no encontradas.")
    logging.warning("Variables de entorno de Supabase no encontradas.")
