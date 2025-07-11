import unittest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fast_api.main import app

class TestPredictEndpoint(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    @patch("fast_api.routers.predictions.predict_label_with_score")
    @patch("fast_api.routers.predictions.supabase")
    def test_predict_endpoint(self, mock_supabase, mock_predict_label_with_score):
        mock_predict_label_with_score.return_value = (True, 0.95)

        mock_table = MagicMock()
        mock_table.insert.return_value.execute.return_value = None
        mock_supabase.table.return_value = mock_table

        response = self.client.post("/predict", json={"text": "You are horrible!"})
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["text"], "You are horrible!")
        self.assertIn("is_toxic", data)
        self.assertIn("toxicity_score", data)
        self.assertIn("model_version", data)

if __name__ == "__main__":
    unittest.main()
