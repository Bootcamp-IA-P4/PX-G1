import unittest
import os
import glob

class TestModelFile(unittest.TestCase):

    def test_model_file_exists(self):
        model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'final_model'))

        pkl_files = glob.glob(os.path.join(model_dir, '*.pkl'))

        self.assertTrue(len(pkl_files) > 0, "No se encontró ningún archivo .pkl en ../final_model")

if __name__ == "__main__":
    unittest.main()
