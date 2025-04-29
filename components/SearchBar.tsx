"use client";

import SearchIcon from "@/ui/SearchIcon";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search artworks by title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <span className="cursor-pointer" title="Search">
            <SearchIcon />
          </span>
        </button>
      </div>
    </form>
  );
}
