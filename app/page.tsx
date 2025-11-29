"use client"; // needed because we use useState and fetch

import React, { useState } from "react";

const App: React.FC = () => {
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://cc235-tp-tf-2025-1.onrender.com/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error de carga:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-start justify-center p-12 overflow-y-auto">

      {/* Main Content */}
      <main className="flex-1 max-w-6xl flex flex-col items-center py-12">
        <h2 className="text-5xl font-bold text-white text-center mb-2">Detector de Imágenes IA</h2>
        <p className="text-lg text-white text-center mb-12 opacity-90">Carga una imagen para revisar si fue creada por IA o no</p>

        {/* Image Preview and Upload Area */}
        <div className="w-full flex flex-col items-center gap-6">
          {/* Upload Input */}
          
          <label className="block w-80 cursor-pointer">
  <input
    type="file"
    accept="image/*"
    onChange={handleUpload}
    className="hidden"
  />
  <span className="px-4 py-2 border-2 border-white rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 text-black text-sm font-medium block text-center">
    📁 Cargar Imagen
  </span>
</label>

          {/* Image Preview Display */}
          {imagePreview && (
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Loading State with Animation */}
          {loading && (
            <div className="mt-6 flex flex-col items-center">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <p className="text-white text-xl font-semibold">Analizando imagen...</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                {/* Result Header */}
                <div className={`p-8 text-white text-center ${
                  result.label === "Real" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-pink-500"
                }`}>
                  <p className="text-sm font-semibold uppercase tracking-wide mb-2">Resultado del análisis</p>
                  <p className="text-5xl font-bold">{result.label}</p>
                </div>

                {/* Confidence Bar */}
                <div className="p-8">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-semibold">Confianza</span>
                      <span className="text-2xl font-bold text-purple-600">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          result.label === "Real" ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-pink-500"
                        }`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {result.confidence > 0.8
                        ? `Estamos muy seguros de que esta imagen es ${result.label.toLowerCase()}.`
                        : result.confidence > 0.6
                        ? `Probablemente esta imagen es ${result.label.toLowerCase()}.`
                        : `Hay incertidumbre sobre si esta imagen es ${result.label.toLowerCase()}.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
