// app/youtube/page.tsx - Nueva página para análisis de YouTube

"use client";

import { useState } from "react";
import { YouTubeAnalysisForm } from "@/components/youtube-analysis-form";
import { YouTubeAnalysisResult } from "@/components/youtube-analysis-result";
import { useYouTubeAnalysis } from "@/hooks/use-youtube-analysis";
import { YouTubeBatchPredictionResponse } from "@/lib/types";

export default function YouTubePage() {
  const { loading, error, analyzeVideo } = useYouTubeAnalysis();
  const [currentResult, setCurrentResult] =
    useState<YouTubeBatchPredictionResponse | null>(null);

  const handleAnalysis = async (videoUrl: string, limit: number) => {
    const result = await analyzeVideo(videoUrl, limit);
    if (result) {
      setCurrentResult(result);
    }
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

      {/* Analysis Form */}
      <div className="flex justify-center">
        <YouTubeAnalysisForm onAnalyze={handleAnalysis} loading={loading} />
      </div>

      {/* Analysis Result */}
      {currentResult && (
        <div className="flex justify-center">
          <YouTubeAnalysisResult result={currentResult} />
        </div>
      )}
    </div>
  );
}
