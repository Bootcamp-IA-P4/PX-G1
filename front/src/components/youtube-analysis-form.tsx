"use client";

import { useState } from "react";

interface YouTubeAnalysisFormProps {
  onAnalyze: (videoUrl: string, limit: number) => Promise<void>;
  loading: boolean;
}

export function YouTubeAnalysisForm({
  onAnalyze,
  loading,
}: YouTubeAnalysisFormProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [limit, setLimit] = useState(20);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    await onAnalyze(videoUrl.trim(), limit);
  };

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const isFormValid = videoUrl.trim() && isValidYouTubeUrl(videoUrl.trim());

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Analizador de Comentarios de YouTube
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Ingresa la URL de un video de YouTube para analizar sus comentarios
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL del Video de YouTube
          </label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          />
          {videoUrl && !isValidYouTubeUrl(videoUrl) && (
            <p className="mt-2 text-sm text-red-600">
              Por favor, ingresa una URL válida de YouTube
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Número de comentarios a analizar
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            disabled={loading}
          >
            <option value={10}>10 comentarios</option>
            <option value={20}>20 comentarios</option>
            <option value={50}>50 comentarios</option>
            <option value={100}>100 comentarios</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            isFormValid && !loading
              ? "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analizando comentarios...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Analizar Comentarios
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
