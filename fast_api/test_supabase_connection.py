from supabase_client import supabase

print("🔄 Probando conexión con Supabase...")

if supabase:
    try:
        # Hacemos una consulta simple a la tabla "predictions"
        result = supabase.table("predictions").select("*").limit(1).execute()
        print("🚀 Conexión exitosa. Resultado:")
        print(result.data)
    except Exception as e:
        print(f"❌ Error al hacer consulta a Supabase: {e}")
else:
    print("❌ El cliente Supabase no está inicializado.")
