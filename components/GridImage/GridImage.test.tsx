import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GridImage from "./GridImage";

// Mock the FALLBACK_IMAGE constant
jest.mock("@/constant", () => ({
  FALLBACK_IMAGE: "/fallback-image.jpg",
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    className,
    width,
    height,
    priority,
    onError,
    unoptimized,
    "data-testid": testId,
  }: {
    src: string;
    alt: string;
    className: string;
    width: number;
    height: number;
    priority?: boolean;
    onError: () => void;
    unoptimized: boolean;
    "data-testid"?: string;
  }) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        data-testid={testId || "image"}
        loading={priority ? "eager" : "lazy"}
        onError={onError}
      />
    );
  },
}));

describe("GridImage", () => {
  const mockArtwork = {
    iiif_url: "https://example.com/image-service",
    image_id: "abc123",
    title: "Test Artwork",
    id: "1",
  };

  beforeEach(() => {
    jest.useFakeTimers();
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders with correct initial image URL from artwork", async () => {
    render(<GridImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByRole("img");

    // Should render with the initial 843px image URL
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/400,/0/default.jpg"
    );
    expect(img).toHaveClass("test-class");
    expect(img).toHaveAttribute("alt", "Test Artwork");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("width", "500");
    expect(img).toHaveAttribute("height", "500");
  });

  it("renders fallback image when artwork has no iiif_url", () => {
    const invalidArtwork = {
      ...mockArtwork,
      iiif_url: "",
    };

    render(<GridImage artwork={invalidArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/fallback-image.jpg");
  });

  it("renders fallback image when iiif_url is missing", () => {
    const noIiifUrlArtwork = {
      ...mockArtwork,
      iiif_url: "",
    };

    render(<GridImage artwork={noIiifUrlArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/fallback-image.jpg");
  });

  it("renders fallback image when image_id is missing", () => {
    const noImageIdArtwork = {
      ...mockArtwork,
      image_id: "",
    };

    render(<GridImage artwork={noImageIdArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/fallback-image.jpg");
  });

  it("retries with smaller image (600px) on first error", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<GridImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByRole("img");

    // Initially should have 843px image
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/400,/0/default.jpg"
    );

    // Trigger error on the image
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });

    // Should now have 600px image (retry)
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/600,/0/default.jpg"
    );
  });

  it("falls back to fallback image on second error", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<GridImage artwork={mockArtwork} className="test-class" />);

    const img = screen.getByRole("img");

    // First error - should retry with 600px
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });

    // Second error - should fallback
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });

    expect(img).toHaveAttribute("src", "/fallback-image.jpg");
  });

  it("resets retry state when artwork changes", async () => {
    const { rerender } = render(
      <GridImage artwork={mockArtwork} className="test-class" />
    );

    const img = screen.getByRole("img");

    // Trigger first error
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });

    // Should have 600px after first error
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/600,/0/default.jpg"
    );

    // Change artwork to a new one
    const newArtwork = {
      ...mockArtwork,
      image_id: "def456",
    };

    await act(async () => {
      rerender(<GridImage artwork={newArtwork} className="test-class" />);
    });

    // Should reset to 843px for new artwork
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/def456/full/400,/0/default.jpg"
    );

    // Error on new artwork should retry again
    await act(async () => {
      img.dispatchEvent(new Event("error"));
    });

    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/def456/full/600,/0/default.jpg"
    );
  });

  it("uses default alt text when title is missing", () => {
    const noTitleArtwork = {
      ...mockArtwork,
      title: "",
    };

    render(<GridImage artwork={noTitleArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Art work");
  });

  it("uses default alt text when title is undefined", () => {
    const noTitleArtwork = {
      ...mockArtwork,
      title: undefined,
    };

    render(<GridImage artwork={noTitleArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Art work");
  });

  it("sets priority loading when priority prop is true", () => {
    render(
      <GridImage artwork={mockArtwork} className="test-class" priority={true} />
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "eager");
  });

  it("sets lazy loading when priority prop is false or undefined", () => {
    const { rerender } = render(
      <GridImage
        artwork={mockArtwork}
        className="test-class"
        priority={false}
      />
    );

    let img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");

    rerender(<GridImage artwork={mockArtwork} className="test-class" />);

    img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("handles artwork with special characters in image_id", () => {
    const specialCharArtwork = {
      ...mockArtwork,
      image_id: "abc-123_xyz/456",
    };

    render(<GridImage artwork={specialCharArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc-123_xyz/456/full/400,/0/default.jpg"
    );
  });

  it("handles iiif_url with trailing slash", () => {
    const trailingSlashArtwork = {
      ...mockArtwork,
      iiif_url: "https://example.com/image-service/",
    };

    render(<GridImage artwork={trailingSlashArtwork} className="test-class" />);

    const img = screen.getByRole("img");
    // Should handle the double slash correctly
    expect(img).toHaveAttribute(
      "src",
      "https://example.com/image-service/abc123/full/400,/0/default.jpg"
    );
  });
});
