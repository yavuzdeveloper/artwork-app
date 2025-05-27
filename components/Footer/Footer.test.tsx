import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders correctly with current year and name", () => {
    const year = new Date().getFullYear();

    render(<Footer />);

    expect(
      screen.getByText(`© ${year} Art Collection by`, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText("Yavuz Tokus")).toBeInTheDocument();
  });

  it("has a LinkedIn link with correct href", () => {
    render(<Footer />);

    const linkedInLink = screen.getByText("Yavuz Tokus").closest("a");
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/yavuztokus/"
    );
    expect(linkedInLink).toHaveAttribute("target", "_blank");
  });

  it("has a GitHub link with correct href", () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText("GitHub");

    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/yavuzdeveloper"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders SVG icons", () => {
    render(<Footer />);

    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
  });
});
