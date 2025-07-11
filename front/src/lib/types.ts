export interface PredictionRequest {
  text: string;
}

export interface PredictionResponse {
  text: string;
  is_toxic: boolean;
  toxicity_score: number;
  model_version: string;
}

export interface PredictionRecord extends PredictionResponse {
  id: string;
  created_at: string;
}

export interface YouTubePredictionRequest {
  video_url: string;
  limit?: number;
}

export interface YouTubeBatchPredictionResponse {
  video_url: string;
  comments: string[];
  translated_comments: string[];
  predictions: PredictionResponse[];
  average_toxicity_score: number;
  any_toxic: boolean;
}
