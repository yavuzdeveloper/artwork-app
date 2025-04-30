"use client";

import Back from "@/ui/Back";
import Link from "next/link";
import React from "react";

const BackToArtCollection = () => {
  return (
    <Link
      href="#"
      onClick={e => {
        e.preventDefault();
        window.history.back();
      }}
      className="inline-block mb-6 group"
    >
      <span className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
        <Back />
        Back to Art Collection
      </span>
    </Link>
  );
};

export default BackToArtCollection;
