import { Suspense } from "react";

import ArtworkGrid from "@/components/ArtworkGrid/ArtworkGrid";
import { ArtworkGridSkeleton } from "@/components/ArtworkGrid/ArtworkGridSkeleton";
import EmptyState from "@/components/EmptyState/EmptyState";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import { fetchArtworks } from "@/utils/api";

export default async function Home(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
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
