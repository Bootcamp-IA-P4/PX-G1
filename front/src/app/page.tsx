"use client";

import { useState } from "react";
import { PredictionForm } from "@/components/prediction-form";
import { PredictionResult } from "@/components/prediction-result";
import { PredictionHistory } from "@/components/prediction-history";
import { usePredictions } from "@/hooks/use-predictions";
import { PredictionResponse } from "@/lib/types";

export default function Home() {
  const { history, loading, error, makePrediction, fetchHistory } =
    usePredictions();
  const [currentResult, setCurrentResult] = useState<PredictionResponse | null>(
    null
  );

  const handlePrediction = async (text: string) => {
    const result = await makePrediction(text);
    return result;
  };

  const handleResult = (result: PredictionResponse) => {
    setCurrentResult(result);
  };

  return (
    <div className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prediction Form */}
      <div className="flex justify-center">
        <PredictionForm
          onPredict={handlePrediction}
          loading={loading}
          onResult={handleResult}
        />
      </div>

      {/* Current Result */}
      {currentResult && (
        <div className="flex justify-center">
          <PredictionResult result={currentResult} />
        </div>
      )}

      {/* History */}
      <div className="flex justify-center">
        <PredictionHistory
          history={history}
          onRefresh={fetchHistory}
          loading={loading}
        />
      </div>
    </div>
  );
}
