"use client";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-2xl font-bold text-red-700">Ops! Algo deu errado.</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  );
}
