import { render, screen } from "@testing-library/react";

import { FALLBACK_IMAGE } from "@/constant";
import Loading from "./loading";

// Mock the FALLBACK_IMAGE constant
jest.mock("@/constant", () => ({
  FALLBACK_IMAGE: "/fallback-image.jpg",
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; style?: object; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      style={props.style}
      className={props.className}
      alt="Art work"
    />
  ),
}));

describe("Loading Component", () => {
  it("renders the loading skeleton correctly", () => {
    render(<Loading />);

    // Check the main container
    const container = screen.getByTestId("loading-container");
    expect(container).toHaveClass("min-h-screen", "bg-gray-50", "py-8", "px-4");

    // Check the max width container
    const maxWidthContainer = screen.getByTestId("max-width-container");
    expect(maxWidthContainer).toHaveClass("max-w-4xl", "mx-auto");

    // Check the title placeholder
    const titlePlaceholder = screen.getByTestId("title-placeholder");
    expect(titlePlaceholder).toHaveClass(
      "h-6",
      "w-40",
      "bg-gray-200",
      "rounded",
      "animate-pulse",
      "mb-6"
    );

    // Check the card container
    const cardContainer = screen.getByTestId("card-container");
    expect(cardContainer).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "overflow-hidden"
    );

    // Check the fallback image
    const image = screen.getByAltText("Art work");
    expect(image).toHaveAttribute("src", FALLBACK_IMAGE);
    expect(image).toHaveClass(
      "w-full",
      "h-auto",
      "max-h-[70vh]",
      "object-contain",
      "mx-auto"
    );

    // Check the content placeholders
    const contentPlaceholder1 = screen.getByTestId("content-placeholder-1");
    expect(contentPlaceholder1).toHaveClass(
      "h-8",
      "w-1/2",
      "bg-gray-200",
      "rounded",
      "animate-pulse",
      "mb-4"
    );

    const contentPlaceholder2 = screen.getByTestId("content-placeholder-2");
    expect(contentPlaceholder2).toHaveClass(
      "h-6",
      "w-1/5",
      "bg-gray-200",
      "rounded",
      "animate-pulse"
    );
  });

  it("matches snapshot without test IDs", () => {
    const { asFragment } = render(<Loading />);
    const fragment = asFragment();

    // Create a new DocumentFragment without test IDs
    const newFragment = document.createDocumentFragment();
    const container = document.createElement("div");
    newFragment.appendChild(container);
    container.innerHTML = fragment.firstElementChild!.innerHTML;

    // Remove all test IDs
    container.querySelectorAll("[data-testid]").forEach(el => {
      el.removeAttribute("data-testid");
    });

    expect(container).toMatchSnapshot();
  });
});
