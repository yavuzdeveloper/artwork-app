/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock Search since it's wrapped in Suspense
jest.mock("../Search/Search", () => () => (
  <div data-testid="search-bar">Search Bar</div>
));

describe("Header Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly on home page", () => {
    // Mock home page path
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Header />);

    // Check the title is rendered
    expect(screen.getByText("Art Collection")).toBeInTheDocument();

    // Check search bar is rendered on home page
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();

    // Check the layout classes
    const container = screen.getByRole("banner");
    expect(container).toHaveClass(
      "sticky",
      "top-0",
      "z-50",
      "bg-white",
      "shadow-sm",
      "w-full"
    );
  });

  it("renders correctly on non-home pages", () => {
    // Mock non-home page path
    (usePathname as jest.Mock).mockReturnValue("/about");

    render(<Header />);

    // Check the title is rendered
    expect(screen.getByText("Art Collection")).toBeInTheDocument();

    // Check search bar is not rendered on non-home pages
    expect(screen.queryByTestId("search-bar")).not.toBeInTheDocument();

    // Check the layout is centered
    const innerDiv = screen.getByText("Art Collection").parentElement;
    expect(innerDiv).toHaveClass("justify-center");
  });

  it("shows loading state for search bar", () => {
    // Mock home page path
    (usePathname as jest.Mock).mockReturnValue("/");

    // Mock the Search to return null to simulate loading
    jest.mock("../Search/Search", () => () => null);

    render(<Header />);

    // TODO: Find a way to test the loading state
    // In a real test, you'd check for the SearchIcon fallback
    // This is tricky because the icon is inside Suspense
    // You might need to adjust the test or the component to better test loading states
  });
});
