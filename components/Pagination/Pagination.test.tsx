/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";

import Pagination from "./Pagination";

// Mock next/link to simplify testing
jest.mock("next/link", () => {
  return ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe("Pagination", () => {
  const baseProps = {
    page: 2,
    totalPages: 5,
  };

  it("renders pagination with active Previous and Next buttons", () => {
    render(<Pagination {...baseProps} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();

    const previousLink = screen.getByText("Previous");
    const nextLink = screen.getByText("Next");

    expect(previousLink).toHaveClass("bg-gray-200");
    expect(nextLink).toHaveClass("bg-gray-200");
    expect(previousLink).toHaveAttribute("href", "/?page=1");
    expect(nextLink).toHaveAttribute("href", "/?page=3");
  });

  it("disables Previous button on first page", () => {
    render(<Pagination {...{ ...baseProps, page: 1 }} />);

    const previous = screen.getByText("Previous");
    const next = screen.getByText("Next");

    expect(previous).toHaveClass("bg-gray-100");
    expect(previous).toHaveClass("text-gray-400");
    expect(previous.tagName).toBe("SPAN");
    expect(next).toHaveClass("bg-gray-200");
  });

  it("disables Next button on last page", () => {
    render(<Pagination {...{ ...baseProps, page: 5 }} />);

    const previous = screen.getByText("Previous");
    const next = screen.getByText("Next");

    expect(next).toHaveClass("bg-gray-100");
    expect(next).toHaveClass("text-gray-400");
    expect(next.tagName).toBe("SPAN");
    expect(previous).toHaveClass("bg-gray-200");
  });

  it("includes search query in navigation links when provided", () => {
    render(<Pagination {...baseProps} searchQuery="monet" />);

    const previousLink = screen.getByText("Previous");
    const nextLink = screen.getByText("Next");

    expect(previousLink).toHaveAttribute("href", "/?search=monet&page=1");
    expect(nextLink).toHaveAttribute("href", "/?search=monet&page=3");
  });

  it("renders correctly with only one page", () => {
    render(<Pagination page={1} totalPages={1} />);

    const previous = screen.getByText("Previous");
    const next = screen.getByText("Next");

    expect(previous).toHaveClass("bg-gray-100");
    expect(next).toHaveClass("bg-gray-100");
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<Pagination {...baseProps} />);

    const previousLink = screen.getByText("Previous");

    expect(previousLink).toHaveClass("px-4");
    expect(previousLink).toHaveClass("py-2");
    expect(previousLink).toHaveClass("rounded");
    expect(previousLink).toHaveClass("transition-colors");
    expect(previousLink).toHaveClass("bg-gray-200");
    expect(previousLink).toHaveClass("text-gray-800");
    expect(previousLink).toHaveClass("hover:bg-gray-300");
  });
});
