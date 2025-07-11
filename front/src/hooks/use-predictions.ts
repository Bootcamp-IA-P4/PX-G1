import { useState, useEffect } from "react";
import { PredictionRecord, PredictionResponse } from "@/lib/types";
import { predictToxicity, getPredictionHistory } from "@/lib/api";

export function usePredictions() {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setError(null);
      const data = await getPredictionHistory(20);
      setHistory(data);
    } catch (err) {
      setError("Error al cargar el historial");
      console.error(err);
    }
  };

  const makePrediction = async (
    text: string
  ): Promise<PredictionResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const prediction = await predictToxicity(text);

      // Actualizar historial después de una predicción exitosa
      await fetchHistory();

      return prediction;
    } catch (err) {
      setError("Error al realizar la predicción");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    makePrediction,
    fetchHistory,
  };
}
