"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { PredictionResponse } from "@/lib/types";
import { getToxicityLevel } from "@/lib/utils";

interface PredictionResultProps {
  result: PredictionResponse;
}

export function PredictionResult({ result }: PredictionResultProps) {
  const { level, color, bgColor } = getToxicityLevel(result.toxicity_score);
  const percentage = Math.round(result.toxicity_score * 100);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {result.is_toxic ? (
            <AlertTriangle className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
          Resultado del Análisis
        </CardTitle>
        <CardDescription>
          Análisis completado con el modelo {result.model_version}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Texto analizado */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Comentario analizado:
          </h4>
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-800 italic">{result.text}</p>
          </div>
        </div>

        {/* Resultado principal */}
        <div className={`p-4 rounded-lg ${bgColor} border`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Clasificación:
            </span>
            <span className={`text-lg font-bold ${color}`}>
              {result.is_toxic ? "TÓXICO" : "NO TÓXICO"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Nivel de toxicidad:
            </span>
            <span className={`text-sm font-semibold ${color}`}>{level}</span>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Confianza:</span>
              <span className="font-medium">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  result.toxicity_score >= 0.8
                    ? "bg-red-500"
                    : result.toxicity_score >= 0.6
                    ? "bg-orange-500"
                    : result.toxicity_score >= 0.4
                    ? "bg-yellow-500"
                    : result.toxicity_score >= 0.2
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Shield className="h-4 w-4" />
          <span>
            Este análisis es realizado por un modelo de IA y puede no ser 100%
            preciso. Úsalo como referencia.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
