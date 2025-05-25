"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"
      data-testid="error-container"
    >
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Oops! Something went wrong.
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => history.back()}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
