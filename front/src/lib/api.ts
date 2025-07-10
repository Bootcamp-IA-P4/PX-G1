import {
  PredictionRequest,
  PredictionResponse,
  PredictionRecord,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictToxicity(
  text: string
): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text } as PredictionRequest),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getPredictionHistory(
  limit: number = 10
): Promise<PredictionRecord[]> {
  const response = await fetch(`${API_BASE_URL}/history?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
