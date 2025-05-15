import Link from "next/link";

const btnClasses = "px-4 py-2 rounded transition-colors";
const activeBtn = "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer";
const disabledBtn = "bg-gray-100 text-gray-400";

export default function Pagination({
  page,
  totalPages,
  searchQuery,
}: {
  page: number;
  totalPages: number;
  searchQuery?: string;
}) {
  const getHref = (pageNum: number) => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    params.set("page", pageNum.toString());

    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-4">
      {page > 1 ? (
        <Link href={getHref(page - 1)} className={`${btnClasses} ${activeBtn}`}>
          Previous
        </Link>
      ) : (
        <span className={`${btnClasses} ${disabledBtn}`}>Previous</span>
      )}

      <span className="py-2 text-gray-600">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={getHref(page + 1)} className={`${btnClasses} ${activeBtn}`}>
          Next
        </Link>
      ) : (
        <span className={`${btnClasses} ${disabledBtn}`}>Next</span>
      )}
    </div>
  );
}
