"use client";

import { useEffect, useState, useRef } from "react";
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
  const [src, setSrc] = useState(FALLBACK_IMAGE);
  const hasRetried = useRef(false);

  const cleanIiifUrl = (url: string) => {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  };

  useEffect(() => {
    if (!artwork?.iiif_url || !artwork?.image_id) {
      setSrc(FALLBACK_IMAGE);
      hasRetried.current = false;
      return;
    }

    const baseUrl = cleanIiifUrl(artwork.iiif_url);
    const imageUrl = `${baseUrl}/${artwork.image_id}/full/400,/0/default.jpg`;
    setSrc(imageUrl);
    hasRetried.current = false;
  }, [artwork]);

  const handleError = () => {
    if (!hasRetried.current && artwork?.iiif_url && artwork?.image_id) {
      hasRetried.current = true;

      const baseUrl = cleanIiifUrl(artwork.iiif_url);
      const fallbackUrl = `${baseUrl}/${artwork.image_id}/full/600,/0/default.jpg`;
      setSrc(fallbackUrl);
    } else {
      setSrc(FALLBACK_IMAGE);
    }
  };

  return (
    <Image
      className={className}
      src={src}
      alt={artwork?.title || "Art work"}
      data-testid="grid-image"
      width={500}
      height={500}
      onError={handleError}
      priority={priority}
      unoptimized={true}
    />
  );
}
