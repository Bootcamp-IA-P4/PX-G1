from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PredictionRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    text: str
    is_toxic: bool
    toxicity_score: float
    model_version: Optional[str] = None

class PredictionRecord(BaseModel):
    id: str
    text: str
    is_toxic: bool
    toxicity_score: Optional[float]
    model_version: Optional[str]
    created_at: datetime

