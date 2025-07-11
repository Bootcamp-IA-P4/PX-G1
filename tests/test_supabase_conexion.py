import os
import unittest
from fast_api.supabase_client import supabase

class TestSupabaseConnection(unittest.TestCase):

    def test_env_variables_exist(self):
        self.assertIsNotNone(os.getenv("SUPABASE_URL"), "SUPABASE_URL no está definida.")
        self.assertIsNotNone(os.getenv("SUPABASE_KEY"), "SUPABASE_KEY no está definida.")

    def test_supabase_client_initialized(self):
        self.assertIsNotNone(supabase, "El cliente de Supabase no se ha inicializado correctamente.")

    def test_basic_query(self):
        try:
            response = supabase.table("predictions").select("*").limit(1).execute()
            self.assertIn("data", response.model_dump(), "No se obtuvo una respuesta válida.")
        except Exception as e:
            self.fail(f"Consulta básica a Supabase falló: {e}")
