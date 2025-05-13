import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ArtworkCard from "./ArtworkCard";
import { Artwork } from "@/types";

// Mock next/link for Next.js 13+
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock GridImage component
jest.mock("../GridImage/GridImage", () => ({
  __esModule: true,
  default: ({
    artwork,
    className,
  }: {
    artwork: Artwork;
    className: string;
  }) => (
    <img
      src={`${artwork.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}
      alt={artwork.title}
      className={className}
      data-testid="grid-image"
    />
  ),
}));

const mockArtwork: Artwork = {
  id: "1",
  title: "Mona Lisa",
  image_id: "1",
  iiif_url: "https://iiif.artic.edu/iiif/2",
  description: "",
};

describe("ArtworkCard Component", () => {
  it("should render correctly with artwork data", () => {
    render(<ArtworkCard artwork={mockArtwork} />);

    // Verify title is displayed
    expect(screen.getByText("Mona Lisa")).toBeInTheDocument();

    // Verify link has correct href
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/artwork/1");

    // Verify image is rendered with correct props
    const image = screen.getByTestId("grid-image");
    expect(image).toHaveAttribute(
      "src",
      "https://iiif.artic.edu/iiif/2/1/full/843,/0/default.jpg"
    );
    expect(image).toHaveClass("w-full h-full object-cover");
  });

  it("should have correct hover effect classes", () => {
    render(<ArtworkCard artwork={mockArtwork} />);

    // Verify image hover effect
    const image = screen.getByTestId("grid-image");
    expect(image).toHaveClass("group-hover:scale-105");

    // Verify overlay hover effect
    const overlay = document.querySelector(".bg-gradient-to-t");
    expect(overlay).toHaveClass("opacity-0");
    expect(overlay).toHaveClass("group-hover:opacity-100");
  });

  it("should maintain proper aspect ratio", () => {
    render(<ArtworkCard artwork={mockArtwork} />);
    const imageContainer = document.querySelector(".aspect-square");
    expect(imageContainer).toBeInTheDocument();
  });
});
