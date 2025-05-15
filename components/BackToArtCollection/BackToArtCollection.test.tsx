/* eslint-disable react/display-name */
import { render, screen, fireEvent } from "@testing-library/react";
import BackToArtCollection from "./BackToArtCollection";

// Mock the Back component instead of the entire BackToArtCollection
jest.mock("@/ui/Back", () => () => <svg data-testid="back-icon" />);

describe("BackToArtCollection", () => {
  beforeEach(() => {
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the link with correct text", () => {
    render(<BackToArtCollection />);
    expect(
      screen.getByRole("link", { name: /back to art collection/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("back-icon")).toBeInTheDocument();
  });

  it("calls window.history.back() when clicked", () => {
    render(<BackToArtCollection />);
    const link = screen.getByRole("link", {
      name: /back to art collection/i,
    });

    fireEvent.click(link);
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });
});
