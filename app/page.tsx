"use client"; // needed because we use useState and fetch

import React, { useState } from "react";

const App: React.FC = () => {
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/predict", {
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
    <div className="flex justify-around">
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 flex flex-col items-center" >
        <h2 className="text-3xl font-bold">Bienvenido al Detector de Imagenes potenciado por IA</h2>
        <p className="mt-4">Carga una imagen para revisar si es hecha por IA o no</p>

        {/* Upload Input */}
        <div className="mt-6 flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="w-80 h-40 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none "
          />
        </div>

        {/* Loading State */}
        {loading && <p className="mt-4 text-blue-600">Analizando imagen...</p>}

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <p className="text-lg font-semibold">
              Result: <span className="text-purple-600">{result.label}</span>
            </p>
            <p className="mt-2 text-gray-700">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;