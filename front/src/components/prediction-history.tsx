"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderContent,
  CardIcon,
  CardTitle,
} from "@/components/ui/card";
import { History, AlertTriangle, CheckCircle } from "lucide-react";
import { PredictionRecord } from "@/lib/types";
import { formatDate, getToxicityLevel } from "@/lib/utils";

interface PredictionHistoryProps {
  history: PredictionRecord[];
}

export function PredictionHistory({ history }: PredictionHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardIcon className="bg-gray-500">
            <History className="h-5 w-5 text-white" />
          </CardIcon>
          <CardHeaderContent>
            <CardTitle>Historial de Análisis</CardTitle>
            <CardDescription>
              Aquí aparecerán tus análisis anteriores
            </CardDescription>
          </CardHeaderContent>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No hay análisis previos</p>
            <p className="text-sm">Realiza tu primer análisis de comentarios</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardIcon className="bg-gray-500">
          <History className="h-5 w-5 text-white" />
        </CardIcon>
        <CardHeaderContent>
          <div className="flex-1 flex items-center justify-between">
            <div>
              <CardTitle>Historial de Análisis</CardTitle>
              <CardDescription>
                Últimos {history.length} análisis realizados
              </CardDescription>
            </div>
          </div>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((record) => {
            const { level, color, bgColor } = getToxicityLevel(
              record.toxicity_score
            );
            const percentage = Math.round(record.toxicity_score * 100);

            return (
              <div
                key={record.id}
                className={`p-3 rounded-lg border ${bgColor} hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {record.is_toxic ? (
                      <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-medium ${color}`}>
                      {record.is_toxic ? "TÓXICO" : "NO TÓXICO"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(record.created_at)}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {record.text}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${color}`}>
                    {level} - {percentage}%
                  </span>
                  <span className="text-gray-500">v{record.model_version}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
