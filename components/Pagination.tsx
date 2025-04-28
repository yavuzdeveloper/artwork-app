"use client";

import { useRouter } from "next/navigation";

const btnClasses =
  "px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors cursor-pointer";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
        className={btnClasses}
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-600">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={btnClasses}
      >
        Next
      </button>
    </div>
  );
}
