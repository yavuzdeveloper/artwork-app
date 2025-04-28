import Link from "next/link";
import { use } from "react";

import { fetchArtwork } from "@/utils/api";
import ArtworkDescription from "@/components/ArtworkDescription";

export default function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const artwork = use(fetchArtwork(id));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-6 group">
          <span className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Art Collection
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <img
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              src={`${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {artwork.title}
            </h1>
            <ArtworkDescription description={artwork.description || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
