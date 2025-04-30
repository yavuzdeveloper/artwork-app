"use client";

import { useEffect, useState } from "react";

import { Artwork } from "@/types";
import { FALLBACK_IMAGE } from "@/constant";

interface ImageProps {
  artwork: Artwork;
  className: string;
}

export default function GridImage({ artwork, className }: ImageProps) {
  const imageSrc = `${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
  const [src, setSrc] = useState(FALLBACK_IMAGE);

  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  return (
    <img
      className={className}
      src={src}
      alt={artwork.title || "Art work"}
      loading="lazy"
      onError={() => {
        setSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
