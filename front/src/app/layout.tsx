import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analizador de Comentarios Tóxicos",
  description:
    "Detecta contenido tóxico en comentarios usando inteligencia artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">TC</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Toxic Comment Classifier
                    </h1>
                  </div>
                </div>
                <div className="text-sm text-gray-500">NLP Project</div>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
