import unittest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fast_api.main import app

class TestHistoryEndpoint(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    @patch("fast_api.routers.predictions.supabase")
    def test_history_endpoint(self, mock_supabase):
        mock_table = MagicMock()
        mock_table.select.return_value.order.return_value.limit.return_value.execute.return_value.data = [
            {
                "id": "1",
                "text": "sample",
                "is_toxic": True,
                "model_version": "v1.0",
                "created_at": "2024-01-01T00:00:00"
            }
        ]
        mock_supabase.table.return_value = mock_table

        response = self.client.get("/history?limit=1")

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 1)
        self.assertIn("text", data[0])
        self.assertIn("is_toxic", data[0])
        self.assertIn("id", data[0])

    @patch("fast_api.routers.predictions.supabase", None)
    def test_history_endpoint_without_supabase(self):
        response = self.client.get("/history")
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json()["detail"], "Supabase not initialized")

if __name__ == "__main__":
    unittest.main()
