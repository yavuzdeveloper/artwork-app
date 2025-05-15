import Image from "next/image";

import { FALLBACK_IMAGE } from "@/constant";

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-gray-50 py-8 px-4"
      data-testid="loading-container"
    >
      <div className="max-w-4xl mx-auto" data-testid="max-width-container">
        <div className="inline-block">
          <div
            className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"
            data-testid="title-placeholder"
          ></div>
        </div>
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          data-testid="card-container"
        >
          <div className="px-4 py-4">
            <Image
              src={FALLBACK_IMAGE}
              alt="Art work"
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              width={800}
              height={600}
              priority
              data-testid="grid-image"
            />
          </div>
          <div className="p-6">
            <div
              className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-4"
              data-testid="content-placeholder-1"
            ></div>
            <div
              className="h-6 w-1/5 bg-gray-200 rounded animate-pulse"
              data-testid="content-placeholder-2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
