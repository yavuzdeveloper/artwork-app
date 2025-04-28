import { fetchArtworks } from "@/utils/api";
import ArtworkGrid from "@/components/ArtworkGrid";
import { ArtworkGridSkeleton } from "@/components/ArtworkGridSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Art Collection
      </h1>
      <Suspense fallback={<ArtworkGridSkeleton />}>
        <ArtworkGridWrapper />
      </Suspense>
    </div>
  );
}

async function ArtworkGridWrapper() {
  const artworks = await fetchArtworks();
  return <ArtworkGrid artworks={artworks} />;
}
