import { use } from "react";

import { fetchArtwork } from "@/utils/api";
import ArtworkDescription from "@/components/ArtworkDescription";
import Image from "@/components/Image";
import BackToArtCollection from "@/components/BackToArtCollection";

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
            <Image
              artwork={artwork}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {artwork.title}
            </h2>
            <ArtworkDescription description={artwork.description || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
