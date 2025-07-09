import unittest
from fastapi.testclient import TestClient
from fast_api.main import app

class TestMainAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "API is working 🚀"})

if __name__ == "__main__":
    unittest.main()
