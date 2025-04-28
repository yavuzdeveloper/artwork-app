import Link from "next/link";
import { Artwork } from "@/types";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={`${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {artwork.title}
        </h2>
      </div>
    </Link>
  );
}
