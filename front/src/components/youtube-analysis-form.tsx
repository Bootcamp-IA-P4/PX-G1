"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardIcon,
  CardHeaderContent,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardIcon>
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
        </CardIcon>
        <CardHeaderContent>
          <CardTitle>Analizador de Comentarios de YouTube</CardTitle>
          <CardDescription>
            Ingresa la URL de un video de YouTube para analizar sus comentarios
          </CardDescription>
        </CardHeaderContent>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <Label htmlFor="videoUrl">URL del Video de YouTube</Label>
            <Input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={loading}
            />
            {videoUrl && !isValidYouTubeUrl(videoUrl) && (
              <p className="mt-2 text-sm text-red-600">
                Por favor, ingresa una URL válida de YouTube
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="limit">Número de comentarios a analizar</Label>
            <Select
              id="limit"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              disabled={loading}
            >
              <option value={10}>10 comentarios</option>
              <option value={20}>20 comentarios</option>
              <option value={50}>50 comentarios</option>
              <option value={100}>100 comentarios</option>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            loading={loading}
            className="w-full"
          >
            {loading ? (
              <>
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
                Analizando comentarios...
              </>
            ) : (
              <>
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
              </>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
