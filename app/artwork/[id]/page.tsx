import Link from "next/link";

import { fetchArtwork } from "@/utils/api";

export default async function ArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const artwork = await fetchArtwork(params.id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Gallery
      </Link>

      <div className="p-4 max-w-4xl mx-auto">
        <h1>{artwork.title}</h1>
        <img
          className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain"
          src={`${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
        />
      </div>
    </div>
  );
}
