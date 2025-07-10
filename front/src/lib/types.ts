export interface PredictionRequest {
  text: string;
}

export interface PredictionResponse {
  text: string;
  is_toxic: boolean;
  toxicity_score: number;
  model_version: string;
}

export interface PredictionRecord {
  id: number;
  text: string;
  is_toxic: boolean;
  toxicity_score: number;
  model_version: string;
  created_at: string;
}
