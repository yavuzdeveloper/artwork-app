import { render, screen } from "@testing-library/react";

import { Artwork } from "@/types";
import ArtworkGrid from "./ArtworkGrid";

jest.mock("../ArtworkCard/ArtworkCard", () => ({
  __esModule: true,
  default: ({ artwork }: { artwork: Artwork }) => (
    <div data-testid="mock-artwork-card">{artwork.title}</div>
  ),
}));

const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Mona Lisa",
    image_id: "abc123",
    iiif_url: "http://example.com",
  },
  {
    id: "2",
    title: "Starry Night",
    image_id: "def456",
    iiif_url: "http://example.com",
  },
  {
    id: "3",
    title: "The Scream",
    image_id: "ghi789",
    iiif_url: "http://example.com",
  },
];

describe("ArtworkGrid", () => {
  test("renders correct number of ArtworkCard components", () => {
    render(<ArtworkGrid artworks={mockArtworks} />);
    const cards = screen.getAllByTestId("mock-artwork-card");
    expect(cards).toHaveLength(mockArtworks.length);
  });

  test("displays artwork titles", () => {
    render(<ArtworkGrid artworks={mockArtworks} />);
    expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
    expect(screen.getByText("Starry Night")).toBeInTheDocument();
    expect(screen.getByText("The Scream")).toBeInTheDocument();
  });

  test("renders nothing when artworks is empty", () => {
    render(<ArtworkGrid artworks={[]} />);
    expect(screen.queryByTestId("mock-artwork-card")).not.toBeInTheDocument();
  });
});
