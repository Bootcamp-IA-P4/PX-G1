import { useState } from "react";
import { YouTubeBatchPredictionResponse } from "@/lib/types";
import { predictYouTubeComments } from "@/lib/api";

export function useYouTubeAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeVideo = async (
    videoUrl: string,
    limit: number = 20
  ): Promise<YouTubeBatchPredictionResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await predictYouTubeComments(videoUrl, limit);
      return result;
    } catch (err) {
      console.error("Error analyzing YouTube video:", err);
      setError(
        "Error al analizar el video de YouTube. Verifica que la URL sea válida y que el video tenga comentarios habilitados."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    analyzeVideo,
  };
}
