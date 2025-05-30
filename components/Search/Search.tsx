"use client";

import ClearIcon from "@/ui/ClearIcon";
import SearchIcon from "@/ui/SearchIcon";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
    // Auto-expand if there's a search query
    if (searchQuery) setIsExpanded(true);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query);
      params.set("page", "1");
    } else {
      params.delete("search");
      setIsExpanded(false);
    }

    router.push(`/?${params.toString()}`);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus input when expanding
      setTimeout(() => {
        focusInput();
      }, 100);
    } else if (!query.trim()) {
      // Clear search when collapsing if empty
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`/?${params.toString()}`);
    }
  };

  const focusInput = () => {
    const input = document.getElementById("search-input");
    input?.focus();
  };

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
    focusInput();
  };

  return (
    <div className="flex items-center justify-end">
      {isExpanded ? (
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in"
          data-testid="search-form"
        >
          <div className="relative">
            <button
              type="submit"
              className="hover:cursor-pointer"
              title="Search"
            >
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
            </button>
            <input
              id="search-input"
              data-testid="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="text-white w-full min-w-[150px] sm:min-w-[300px] pl-10 pr-9 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base"
              autoComplete="off"
            />

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors hover:cursor-pointer"
                title="Clear"
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </form>
      ) : (
        <button
          onClick={toggleSearch}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors hover:cursor-pointer"
          aria-label="Search"
          title="Search"
          data-testid="search-button"
        >
          <SearchIcon className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
