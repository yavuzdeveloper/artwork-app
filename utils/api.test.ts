import { fetchArtworks, fetchArtwork } from "./api";
import axios from "axios";

// Mocks
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("fetchArtworks", () => {
  it("fetches and maps artworks correctly (default mode)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        config: { iiif_url: "http://images.artic.edu/iiif/2" },
        data: [
          { id: 1, title: "Artwork 1", image_id: "img1" },
          { id: 2, title: "Artwork 2", image_id: "img2" },
        ],
        pagination: { current_page: 1, total_pages: 10 },
      }),
    });

    const result = await fetchArtworks(1);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/artworks?page=1"),
      expect.any(Object)
    );
    expect(result.artworks).toHaveLength(2);
    expect(result.artworks[0].title).toBe("Artwork 1");
    expect(result.pagination.total_pages).toBe(10);
  });

  it("fetches search results when searchQuery is provided", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        config: { iiif_url: "http://images.artic.edu/iiif/2" },
        data: [{ id: 3, title: "Search Artwork", image_id: "img3" }],
        info: { total: 24 },
      }),
    });

    const result = await fetchArtworks(1, "search term");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/artworks/search"),
      expect.any(Object)
    );
    expect(result.artworks[0].title).toBe("Search Artwork");
    expect(result.pagination.total_pages).toBe(2); // 24 / 12
  });

  it("returns empty list when data is empty", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: [],
        config: { iiif_url: "http://iiif.test" },
        info: { total: 0 },
      }),
    });

    const result = await fetchArtworks();
    expect(result.artworks).toEqual([]);
    expect(result.pagination.total_pages).toBe(0);
  });

  it("handles missing iiif_url gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: [{ id: 1, title: "Test", image_id: "abc" }],
        config: null,
        info: { total: 12 },
      }),
    });

    const result = await fetchArtworks();
    expect(result.artworks[0].iiif_url).toBeUndefined();
  });

  it("throws error on network failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchArtworks()).rejects.toThrow("Network error");
  });
});

describe("fetchArtwork", () => {
  it("returns artwork data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: 123,
          title: "Artwork Title",
          description: "Some description",
          image_id: "img123",
        },
        config: {
          iiif_url: "http://iiif.test",
        },
      },
    });

    const result = await fetchArtwork("123");
    expect(result).toEqual({
      id: "123",
      title: "Artwork Title",
      description: "Some description",
      image_id: "img123",
      iiif_url: "http://iiif.test",
    });
  });

  it("handles missing description field", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          id: 123,
          title: "No Description",
          image_id: "img456",
        },
        config: {
          iiif_url: "http://iiif.test",
        },
      },
    });

    const result = await fetchArtwork("123");
    expect(result.description).toBe("");
  });

  it("throws on axios error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Axios failed"));

    await expect(fetchArtwork("404")).rejects.toThrow("Axios failed");
  });
});
