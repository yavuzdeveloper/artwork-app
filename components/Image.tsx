"use client";

import { useState } from "react";
import { Artwork } from "@/types";

interface ImageProps {
  artwork: Artwork;
  className: string;
}

export default function Image({ artwork, className }: ImageProps) {
  const [src, setSrc] = useState(
    artwork.image_id
      ? `${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`
      : "https://www.wavonline.com/a/img/no_image_available.jpeg"
  );

  return (
    <img
      className={className}
      src={src}
      alt={artwork.title}
      loading="lazy"
      onError={() =>
        setSrc("https://www.wavonline.com/a/img/no_image_available.jpeg")
      }
    />
  );
}
