"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Send } from "lucide-react";
import { PredictionResponse } from "@/lib/types";

interface PredictionFormProps {
  onPredict: (text: string) => Promise<PredictionResponse | null>;
  loading: boolean;
  onResult: (result: PredictionResponse) => void;
}

export function PredictionForm({
  onPredict,
  loading,
  onResult,
}: PredictionFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const result = await onPredict(text.trim());
    if (result) {
      onResult(result);
      setText("");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="h-6 w-6 text-red-600" />
          Analizador de Comentarios Tóxicos
        </CardTitle>
        <CardDescription>
          Ingresa un comentario para analizar si contiene contenido tóxico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comentario
            </label>
            <Textarea
              id="comment"
              placeholder="Escribe aquí el comentario que quieres analizar..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="text-right text-xs text-gray-500">
              {text.length}/1000 caracteres
            </div>
          </div>
          <Button
            type="submit"
            disabled={!text.trim() || loading}
            className="w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analizando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Analizar Comentario
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
