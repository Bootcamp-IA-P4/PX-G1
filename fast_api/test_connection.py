# fast_api/test_connection.py

from database.base import engine
from database.models import Base

print("🔄 Intentando conectar con la base de datos...")

try:
    # Crea las tablas si no existen (prueba la conexión)
    Base.metadata.create_all(bind=engine)
    print("✅ Conexión exitosa. Tablas creadas correctamente.")
except Exception as e:
    print("❌ Error al conectar con la base de datos:")
    print(e)
