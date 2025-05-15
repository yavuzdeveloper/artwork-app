import { render, screen, fireEvent } from "@testing-library/react";

import Error from "./error";

// Mock window.location ve window.history
const mockReload = jest.fn();
const mockBack = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, "location", {
    value: { reload: mockReload },
    writable: true,
  });

  Object.defineProperty(window, "history", {
    value: { back: mockBack },
    writable: true,
  });

  // console.error'ı mockla
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Error Component", () => {
  // Error interface'ine uygun mock error
  const mockError: Error & { cause?: unknown } = {
    name: "TestError",
    message: "Test error message",
    cause: "Some cause", // opsiyonel cause
  };

  it("renders correctly with default error message", () => {
    render(<Error error={mockError} />);

    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
  });

  it("logs the error with cause when provided", () => {
    const errorWithCause = {
      ...mockError,
      cause: { reason: "Test reason" },
    };

    render(<Error error={errorWithCause} />);

    expect(console.error).toHaveBeenCalledWith(errorWithCause);
  });

  it("logs the error without cause when not provided", () => {
    const errorWithoutCause = {
      name: "TestError",
      message: "Test error message",
    };

    render(<Error error={errorWithoutCause} />);

    expect(console.error).toHaveBeenCalledWith(errorWithoutCause);
  });

  it("calls window.location.reload when 'Try Again' button is clicked", () => {
    render(<Error error={mockError} />);
    fireEvent.click(screen.getByText("Try Again"));
    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("calls window.history.back when 'Go Back' button is clicked", () => {
    render(<Error error={mockError} />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Error error={mockError} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
