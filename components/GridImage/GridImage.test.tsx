import React from "react";
import { render, screen, act } from "@testing-library/react";

import GridImage from "./GridImage";

// Mock the FALLBACK_IMAGE constant
jest.mock("@/constant", () => ({
  FALLBACK_IMAGE: "fallback-image.jpg",
}));

describe("GridImage", () => {
  const mockArtwork = {
    iiif_url: "https://example.com/image-service",
    image_id: "abc123",
    title: "Test Artwork",
    id: "1",
  };

  beforeAll(() => {
    // Mock the Image constructor to control loading behavior
    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      src: string = "";

      constructor() {
        // Don't auto-trigger any events
      }
    } as unknown as typeof Image;
  });

  it("initially renders with fallback image", () => {
    // Mock useState to return fallback image initially
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => ["fallback-image.jpg", jest.fn()]);

    render(<GridImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "fallback-image.jpg");
    expect(img).toHaveClass("test-class");
    expect(img).toHaveAttribute("alt", "Test Artwork");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  // TODO
  // it("updates src after successful image load", async () => {
  //   // Simulate successful image load
  //   await act(async () => {
  //     const imgElement = screen.getByRole("img");
  //     imgElement.dispatchEvent(new Event("load"));
  //   });

  //   expect(screen.getByRole("img")).toHaveAttribute(
  //     "src",
  //     "https://example.com/image-service/abc123/full/843,/0/default.jpg"
  //   );
  // });

  it("falls back to fallback image when image fails to load", async () => {
    render(<GridImage artwork={mockArtwork} className="test-class" />);

    // Simulate image error
    await act(async () => {
      const imgElement = screen.getByRole("img");
      imgElement.dispatchEvent(new Event("error"));
    });

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "fallback-image.jpg"
    );
  });

  it("uses default alt text when title is missing", () => {
    const noTitleArtwork = {
      ...mockArtwork,
      title: "",
    };

    render(<GridImage artwork={noTitleArtwork} className="test-class" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Art work");
  });
});
