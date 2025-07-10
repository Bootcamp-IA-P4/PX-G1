import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getToxicityLevel(score: number): {
  level: string;
  color: string;
  bgColor: string;
} {
  if (score >= 0.8) {
    return { level: "Muy Alto", color: "text-red-700", bgColor: "bg-red-50" };
  } else if (score >= 0.6) {
    return { level: "Alto", color: "text-orange-700", bgColor: "bg-orange-50" };
  } else if (score >= 0.4) {
    return {
      level: "Moderado",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
    };
  } else if (score >= 0.2) {
    return { level: "Bajo", color: "text-blue-700", bgColor: "bg-blue-50" };
  } else {
    return {
      level: "Muy Bajo",
      color: "text-green-700",
      bgColor: "bg-green-50",
    };
  }
}
