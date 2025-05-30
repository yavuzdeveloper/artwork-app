"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

import SearchIcon from "@/ui/SearchIcon";
import Search from "../Search/Search";
import Title from "./Title";

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-black shadow-sm w-full">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <Title />
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
