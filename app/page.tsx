import { fetchArtworks } from "@/utils/api";
import ArtworkGrid from "@/components/ArtworkGrid";
import { ArtworkGridSkeleton } from "@/components/ArtworkGridSkeleton";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams?.page || 1);
  const searchQuery = searchParams?.search;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Art Collection
      </h1>
      <SearchBar />
      <Suspense fallback={<ArtworkGridSkeleton />}>
        <ArtworkGridWrapper page={page} searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}

async function ArtworkGridWrapper({
  page,
  searchQuery,
}: {
  page: number;
  searchQuery?: string;
}) {
  const { artworks, pagination } = await fetchArtworks(page, searchQuery);

  return (
    <>
      {artworks.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          suggestion="Try a different search term or browse our collection."
        />
      ) : (
        <>
          <ArtworkGrid artworks={artworks} />
          <Pagination
            page={pagination.current_page}
            totalPages={pagination.total_pages}
            searchQuery={searchQuery}
          />
        </>
      )}
    </>
  );
}
