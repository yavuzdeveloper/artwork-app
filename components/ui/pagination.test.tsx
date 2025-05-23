import { render, screen } from "@testing-library/react";

import {
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

describe("Pagination components", () => {
  it("PaginationLink renders an anchor by default", () => {
    render(<PaginationLink href="#">Page 1</PaginationLink>);
    const link = screen.getByRole("link", { name: "Page 1" });
    expect(link.tagName).toBe("A");
  });

  it("PaginationLink sets aria-current when active", () => {
    render(
      <PaginationLink href="#" isActive>
        Current
      </PaginationLink>
    );
    const link = screen.getByRole("link", { name: "Current" });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("PaginationNext renders default content if no children", () => {
    render(<PaginationNext />);
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("PaginationPrevious renders default content if no children", () => {
    render(<PaginationPrevious />);
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });
});
