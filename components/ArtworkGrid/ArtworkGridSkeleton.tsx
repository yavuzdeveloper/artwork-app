export function ArtworkGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      data-testid="skeleton-grid"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden"
          data-testid="skeleton-grid-item"
        >
          <div
            className="aspect-square bg-gray-200 animate-pulse"
            data-testid="skeleton-grid-image"
          />
          <div className="p-5">
            <div
              className="h-6 bg-gray-200 rounded animate-pulse mb-2"
              data-testid="skeleton-grid-title"
            />
            <div
              className="h-4 bg-gray-200 rounded animate-pulse w-3/4"
              data-testid="skeleton-grid-subtitle"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
