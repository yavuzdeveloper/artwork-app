"use client";

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
        const input = document.getElementById("search-input");
        input?.focus();
      }, 100);
    } else if (!query.trim()) {
      // Clear search when collapsing if empty
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`/?${params.toString()}`);
    }
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
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full min-w-[150px] sm:min-w-[300px] px-4 pr-9 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={toggleSearch}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Search"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
