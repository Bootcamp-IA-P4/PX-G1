from pydantic import BaseModel
from typing import Optional

class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    text: str
    is_toxic: bool
    model_version: Optional[str] = None
