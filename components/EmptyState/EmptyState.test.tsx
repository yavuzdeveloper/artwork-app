/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";

import EmptyState from "./EmptyState";

// Mock the SearchIcon component
jest.mock("@/ui/SearchIcon", () => ({ className }: { className: string }) => (
  <svg data-testid="search-icon" className={className} />
));

describe("EmptyState", () => {
  it("renders default message when no props are provided", () => {
    render(<EmptyState />);

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(
      screen.getByText("No artworks have been added yet.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try a different search term.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toHaveClass(
      "w-16 h-16 text-gray-400"
    );
  });

  it("renders search query message when searchQuery is provided", () => {
    render(<EmptyState searchQuery="abstract" />);

    expect(
      screen.getByText('No artworks found for "abstract".')
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try a different search term.")
    ).toBeInTheDocument();
  });

  it("renders custom message when customMessage is provided", () => {
    render(<EmptyState customMessage="Custom empty state message" />);

    expect(screen.getByText("Custom empty state message")).toBeInTheDocument();
    expect(
      screen.getByText("Try a different search term.")
    ).toBeInTheDocument();
  });

  it("renders without suggestion when suggestion is not provided", () => {
    render(<EmptyState suggestion="" />);

    expect(
      screen.getByText("No artworks have been added yet.")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Try a different search term.")
    ).not.toBeInTheDocument();
  });

  it("renders with custom suggestion", () => {
    render(<EmptyState suggestion="Please check back later." />);

    expect(
      screen.getByText("No artworks have been added yet.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please check back later.")).toBeInTheDocument();
  });

  it("prioritizes customMessage over searchQuery", () => {
    render(
      <EmptyState searchQuery="abstract" customMessage="Custom message" />
    );

    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(
      screen.queryByText('No artworks found for "abstract".')
    ).not.toBeInTheDocument();
  });

  it("applies correct classes to SearchIcon", () => {
    render(<EmptyState />);
    const icon = screen.getByTestId("search-icon");

    expect(icon).toHaveClass("w-16");
    expect(icon).toHaveClass("h-16");
    expect(icon).toHaveClass("text-gray-400");
  });
});
