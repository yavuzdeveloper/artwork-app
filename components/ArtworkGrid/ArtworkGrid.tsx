import { Artwork } from "@/types";
import ArtworkCard from "../ArtworkCard/ArtworkCard";

export default function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork, i) => (
        <ArtworkCard key={artwork.id} artwork={artwork} priority={i < 4} />
      ))}
    </div>
  );
}
