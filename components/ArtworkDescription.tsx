"use client";

import { useState } from "react";

export default function ArtworkDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-1 mb-3 transition-colors
             ${
               !description
                 ? "text-gray-400"
                 : "text-blue-600 hover:text-blue-800 cursor-pointer"
             }`}
        disabled={!description}
      >
        Description
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          } ${!description ? "text-gray-400" : "text-current"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 py-3 bg-gray-50/50 rounded-lg text-gray-600">
          <div
            className="px-4 py-3 bg-gray-50/50 rounded-lg text-gray-600 prose"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
}
