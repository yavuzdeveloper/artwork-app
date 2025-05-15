import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";

import LightboxImage from "./LightboxImage";
import { Artwork } from "@/types";
import { FALLBACK_IMAGE } from "@/constant";

// Mock the FALLBACK_IMAGE constant
jest.mock("@/constant", () => ({
  FALLBACK_IMAGE: "fallback-image.jpg",
}));

// Mock framer-motion components to simplify testing
jest.mock("framer-motion", () => ({
  motion: {
    img: jest.fn(({ src, alt, className, onClick, onError }) => (
      <img
        src={src}
        alt={alt}
        className={className}
        onClick={onClick}
        onError={onError}
        data-testid="motion-image"
      />
    )),
    div: jest.fn(({ children, onClick }) => (
      <div onClick={onClick} data-testid="motion-div">
        {children}
      </div>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="animate-presence">{children}</div>
  ),
}));

describe("LightboxImage", () => {
  const mockArtwork: Artwork = {
    id: "1",
    title: "Test Artwork",
    image_id: "abc123",
    iiif_url: "https://example.com/image-service",
  };

  beforeEach(() => {
    // Mock Image constructor to control loading behavior
    global.Image = class {
      onload: () => void = () => {};
      onerror: () => void = () => {};
      src: string = "";
    } as unknown as typeof Image;
  });

  it("renders with fallback image initially", () => {
    // Mock useState calls in the correct order
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, jest.fn()]) // First useState (isOpen)
      .mockImplementationOnce(() => [FALLBACK_IMAGE, jest.fn()]); // Second useState (motionImageSrc)

    render(<LightboxImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByTestId("motion-image");
    expect(img).toHaveAttribute("src", FALLBACK_IMAGE);
    expect(img).toHaveClass("test-class");
    expect(img).toHaveClass("cursor-zoom-in");
    expect(img).toHaveAttribute("alt", "Test Artwork");
  });

  it("updates image source after successful load", async () => {
    render(<LightboxImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByTestId("motion-image");
    await act(async () => {
      fireEvent.load(img);
    });

    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/843,/0/default.jpg"
    );
  });

  it("falls back to fallback image when image fails to load", async () => {
    render(<LightboxImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByTestId("motion-image");
    await act(async () => {
      fireEvent.error(img);
    });

    expect(img).toHaveAttribute("src", FALLBACK_IMAGE);
  });

  it("opens lightbox when image is clicked", () => {
    render(<LightboxImage artwork={mockArtwork} />);

    const img = screen.getByTestId("motion-image");
    fireEvent.click(img);

    expect(screen.getByTestId("animate-presence")).toBeInTheDocument();
    expect(screen.getByTestId("motion-div")).toBeInTheDocument();
  });

  it("closes lightbox when overlay is clicked", () => {
    render(<LightboxImage artwork={mockArtwork} />);

    // Open lightbox first
    fireEvent.click(screen.getByTestId("motion-image"));

    // Then click overlay to close
    fireEvent.click(screen.getByTestId("motion-div"));

    expect(screen.queryByTestId("motion-div")).not.toBeInTheDocument();
  });

  it("closes lightbox when close button is clicked", () => {
    render(<LightboxImage artwork={mockArtwork} />);

    // Open lightbox first
    fireEvent.click(screen.getByTestId("motion-image"));

    // Then click close button
    fireEvent.click(screen.getByLabelText("Close lightbox"));

    expect(screen.queryByTestId("motion-div")).not.toBeInTheDocument();
  });

  it("does not close lightbox when image inside is clicked", () => {
    render(<LightboxImage artwork={mockArtwork} />);

    // Open lightbox
    fireEvent.click(screen.getByTestId("motion-image"));

    // Get all images (the thumbnail and the lightbox image)
    const images = screen.getAllByTestId("motion-image");
    // Click the lightbox image (should be the second one)
    fireEvent.click(images[1]);

    // Lightbox should still be open
    expect(screen.getByTestId("motion-div")).toBeInTheDocument();
  });
});
