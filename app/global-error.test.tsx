import { render, screen } from "@testing-library/react";
import * as Sentry from "@sentry/nextjs";

import GlobalError from "./global-error";

jest.mock("@sentry/nextjs");

describe("GlobalError", () => {
  const mockError = new Error("Test client error");

  it("calls Sentry.captureException with the error", () => {
    render(<GlobalError error={mockError} />);
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
  });

  it("renders NextError component", () => {
    render(<GlobalError error={mockError} />);
    // NextError renders a generic heading — test for that
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
