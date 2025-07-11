"use client";

import { useState } from "react";
import { YouTubeBatchPredictionResponse } from "@/lib/types";
import { getToxicityLevel } from "@/lib/utils";

interface YouTubeAnalysisResultProps {
  result: YouTubeBatchPredictionResponse;
}

export function YouTubeAnalysisResult({ result }: YouTubeAnalysisResultProps) {
  const [visibleComments, setVisibleComments] = useState(5);

  const loadMore = () => {
    setVisibleComments((prev) => Math.min(prev + 5, result.predictions.length));
  };

  const averageLevel = getToxicityLevel(result.average_toxicity_score);

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Resumen General */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Resumen del Análisis
            </h3>
            <p className="text-sm text-gray-600">
              Análisis de {result.predictions.length} comentarios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                Toxicidad Promedio
              </span>
            </div>
            <p className={`text-2xl font-bold ${averageLevel.color} mt-2`}>
              {(result.average_toxicity_score * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">{averageLevel.level}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div
                className={`h-3 w-3 rounded-full ${
                  result.any_toxic ? "bg-red-500" : "bg-green-500"
                } mr-2`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                Contenido Tóxico
              </span>
            </div>
            <p
              className={`text-2xl font-bold ${
                result.any_toxic ? "text-red-600" : "text-green-600"
              } mt-2`}
            >
              {result.any_toxic ? "Detectado" : "No detectado"}
            </p>
            <p className="text-sm text-gray-600">
              {result.predictions.filter((p) => p.is_toxic).length} de{" "}
              {result.predictions.length} comentarios
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                Total Comentarios
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {result.predictions.length}
            </p>
            <p className="text-sm text-gray-600">Analizados</p>
          </div>
        </div>
      </div>

      {/* Lista de Comentarios */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Comentarios Analizados
          </h3>
          <span className="text-sm text-gray-500">
            Mostrando {visibleComments} de {result.predictions.length}
          </span>
        </div>

        <div className="space-y-4">
          {result.predictions
            .slice(0, visibleComments)
            .map((prediction, index) => {
              const level = getToxicityLevel(prediction.toxicity_score);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    prediction.is_toxic ? "border-red-500" : "border-green-500"
                  } ${level.bgColor}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          prediction.is_toxic ? "bg-red-500" : "bg-green-500"
                        } mr-2`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          prediction.is_toxic
                            ? "text-red-700"
                            : "text-green-700"
                        }`}
                      >
                        {prediction.is_toxic ? "TÓXICO" : "NO TÓXICO"}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${level.color}`}>
                      {(prediction.toxicity_score * 100).toFixed(1)}% -{" "}
                      {level.level}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {result.comments[index]}
                  </p>
                  {result.comments[index] !== prediction.text && (
                    <p className="text-gray-600 text-xs mt-2 italic">
                      Traducido: {prediction.text}
                    </p>
                  )}
                </div>
              );
            })}
        </div>

        {visibleComments < result.predictions.length && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Cargar más comentarios (
              {result.predictions.length - visibleComments} restantes)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
