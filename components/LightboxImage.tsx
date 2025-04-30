"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FALLBACK_IMAGE } from "@/constant";

export default function LightboxImage({
  artwork,
  className = "",
}: {
  artwork: any;
  className?: string;
}) {
  const imageSrc = `${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`;
  const [isOpen, setIsOpen] = useState(false);

  const [motionImageSrc, setMotionImageSrc] = useState(FALLBACK_IMAGE);

  useEffect(() => {
    setMotionImageSrc(imageSrc);
  }, [imageSrc]);

  return (
    <>
      <motion.img
        src={motionImageSrc}
        alt={artwork.title}
        className={`${className} cursor-zoom-in`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onError={() => setMotionImageSrc(FALLBACK_IMAGE)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative max-w-full max-h-full">
              <motion.img
                src={motionImageSrc}
                alt={artwork.title}
                className="max-w-full max-h-screen object-contain"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onError={() => setMotionImageSrc(FALLBACK_IMAGE)}
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
                onClick={() => setIsOpen(false)}
                aria-label="Close lightbox"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
