"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import SearchIcon from "@/ui/SearchIcon";
import Search from "../Search/Search";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto p-4">
        <div
          className={`flex items-center ${
            isHomePage ? "justify-between" : "justify-center"
          } gap-4`}
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 whitespace-nowrap">
            Art Collection
          </h1>

          {isHomePage && (
            <div className="flex-1">
              <Suspense fallback={<SearchIcon className="w-5 h-5" />}>
                <Search />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
