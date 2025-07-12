import {
  PredictionRequest,
  PredictionResponse,
  PredictionRecord,
  YouTubeBatchPredictionResponse,
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

export async function predictYouTubeComments(
  videoUrl: string,
  limit: number = 20
): Promise<YouTubeBatchPredictionResponse> {
  const response = await fetch(
    `${API_BASE_URL}/predict/youtube?video_url=${encodeURIComponent(
      videoUrl
    )}&limit=${limit}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
