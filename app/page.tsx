import Link from "next/link";

import { fetchArtworks } from "@/utils/api";
import { Artwork } from "@/types";

export default async function Home() {
  const artworks = await fetchArtworks();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Art Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork: Artwork) => (
          <Link
            href={`/artwork/${artwork.id}`}
            key={artwork.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative aspect-square">
              <img
                src={`${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="p-4 font-medium">{artwork.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
