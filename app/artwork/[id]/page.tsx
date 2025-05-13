import { use } from "react";

import { fetchArtwork } from "@/utils/api";
import ArtworkDescription from "@/components/ArtworkDescription";
import LightboxImage from "@/components/LightboxImage";
import BackToArtCollection from "@/components/BackToArtCollection";
import Share from "@/ui/Share";
import Like from "@/ui/Like";

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
        <BackToArtCollection />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <LightboxImage
              artwork={artwork}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {artwork.title}
              </h2>
              <div className="flex flex-col gap-3 absolute top-20 right-4">
                {/* Like Button */}
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors"
                    title="Like"
                  >
                    <Like />
                  </button>
                </div>

                {/* Share Button */}
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <button
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
                    title="Share"
                  >
                    <Share />
                  </button>
                </div>
              </div>
            </div>
            <ArtworkDescription description={artwork.description || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
