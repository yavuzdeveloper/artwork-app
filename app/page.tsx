import { fetchArtworks } from "@/utils/api";
import ArtworkGrid from "@/components/ArtworkGrid";
import { ArtworkGridSkeleton } from "@/components/ArtworkGridSkeleton";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams?.page || 1);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Art Collection
      </h1>
      <Suspense fallback={<ArtworkGridSkeleton />}>
        <ArtworkGridWrapper page={page} />
      </Suspense>
    </div>
  );
}

async function ArtworkGridWrapper({ page }: { page: number }) {
  const { artworks, pagination } = await fetchArtworks(page);
  return (
    <>
      <ArtworkGrid artworks={artworks} />
      <Pagination
        page={pagination.current_page}
        totalPages={pagination.total_pages}
      />
    </>
  );
}
