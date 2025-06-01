"use client";

import Link from "next/link";
import {
  next,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  previous,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  searchQuery?: string;
}

export default function PaginationShadcn({ page, searchQuery }: Props) {
  const getHref = (pageNum: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", pageNum.toString());
    return `/?${params.toString()}`;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          {page > 1 ? (
            <PaginationPrevious asChild>
              <Link href={getHref(page - 1)}>{previous}</Link>
            </PaginationPrevious>
          ) : (
            <span className="pointer-events-none opacity-50">
              <PaginationPrevious href="#" />
            </span>
          )}
        </PaginationItem>
        {/* First Page */}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink asChild>
              <Link href={getHref(1)}>1</Link>
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Ellipsis */}
        {page > 4 && <PaginationEllipsis />}
        {/* Previous Page */}
        {page > 2 && (
          <PaginationItem>
            <PaginationLink asChild>
              <Link href={getHref(page - 1)}>{page - 1}</Link>
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Current Page */}
        <PaginationItem>
          <PaginationLink asChild isActive>
            <Link href={getHref(page)}>{page}</Link>
          </PaginationLink>
        </PaginationItem>
        {/* Next Page */}
        <PaginationItem>
          <PaginationLink asChild>
            <Link href={getHref(page + 1)}>{page + 1}</Link>
          </PaginationLink>
        </PaginationItem>
        {/* Ellipsis */}
        {<PaginationEllipsis />}
        {/* Next */}
        <PaginationItem>
          <PaginationNext asChild>
            <Link href={getHref(page + 1)}>{next}</Link>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
