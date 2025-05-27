"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Artwork } from "@/types";
import { FALLBACK_IMAGE } from "@/constant";

interface ImageProps {
  artwork: Artwork;
  className: string;
  priority?: boolean;
}

export default function GridImage({
  artwork,
  className,
  priority,
}: ImageProps) {
  const imageSrc = `${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
  const [src, setSrc] = useState(FALLBACK_IMAGE);

  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  return (
    <Image
      className={className}
      src={src}
      alt={artwork.title || "Art work"}
      data-testid="grid-image"
      width={500}
      height={500}
      onError={() => setSrc(FALLBACK_IMAGE)}
      priority={priority}
    />
  );
}
