import { render, screen, fireEvent } from "@testing-library/react";

import ArtworkDescription from "./ArtworkDescription";

describe("ArtworkDescription", () => {
  const mockDescription = "<p>This is a description.</p>";

  test("renders the button", () => {
    render(<ArtworkDescription description={mockDescription} />);
    expect(
      screen.getByRole("button", { name: /description/i })
    ).toBeInTheDocument();
  });

  test("does not show description initially", () => {
    render(<ArtworkDescription description={mockDescription} />);
    expect(
      screen.queryByText(/this is a description/i)
    ).not.toBeInTheDocument();
  });

  test("shows description when button is clicked", () => {
    render(<ArtworkDescription description={mockDescription} />);
    const button = screen.getByRole("button", { name: /description/i });
    fireEvent.click(button);
    expect(screen.getByText(/this is a description/i)).toBeInTheDocument();
  });

  test("button is disabled when no description is provided", () => {
    render(<ArtworkDescription description="" />);
    const button = screen.getByRole("button", { name: /description/i });
    expect(button).toBeDisabled();
  });

  test("does not show anything when description is empty, even after click", () => {
    render(<ArtworkDescription description="" />);
    const button = screen.getByRole("button", { name: /description/i });
    fireEvent.click(button);
    expect(
      screen.queryByText(/this is a description/i)
    ).not.toBeInTheDocument();
  });
});
