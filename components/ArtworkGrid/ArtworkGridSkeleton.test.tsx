import { render, screen } from "@testing-library/react";

import { ArtworkGridSkeleton } from "./ArtworkGridSkeleton";

describe("ArtworkGridSkeleton", () => {
  it("renders correctly with test IDs", () => {
    render(<ArtworkGridSkeleton />);

    expect(screen.getByTestId("skeleton-grid")).toBeInTheDocument();

    const items = screen.getAllByTestId("skeleton-grid-item");
    expect(items).toHaveLength(6);

    expect(screen.getAllByTestId("skeleton-grid-image")).toHaveLength(6);
    expect(screen.getAllByTestId("skeleton-grid-title")).toHaveLength(6);
    expect(screen.getAllByTestId("skeleton-grid-subtitle")).toHaveLength(6);
  });
});
