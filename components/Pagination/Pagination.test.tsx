/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import PaginationShadcn from "./Pagination";

// Mock next/link
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

describe("PaginationShadcn", () => {
  it("renders previous and next links correctly", () => {
    render(<PaginationShadcn page={2} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    const previousLink = screen.getByText("Previous").closest("a");
    const nextLink = screen.getByText("Next").closest("a");

    expect(previousLink).toHaveAttribute("href", "/?page=1");
    expect(nextLink).toHaveAttribute("href", "/?page=3");
  });

  it("disables previous button on first page", () => {
    render(<PaginationShadcn page={1} />);

    const previous = screen.getByText("Previous");
    expect(previous.closest("span")).toHaveClass("hidden sm:block");
  });

  it("includes search query in page links", () => {
    render(<PaginationShadcn page={3} searchQuery="vangogh" />);

    const previousLink = screen.getByText("Previous").closest("a");
    const nextLink = screen.getByText("Next").closest("a");

    expect(previousLink).toHaveAttribute("href", "/?search=vangogh&page=2");
    expect(nextLink).toHaveAttribute("href", "/?search=vangogh&page=4");
  });

  it("renders first and current page correctly", () => {
    render(<PaginationShadcn page={3} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders ellipses when page is beyond 4", () => {
    render(<PaginationShadcn page={6} />);
    const ellipses = screen.getAllByText("More pages");

    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });
});
