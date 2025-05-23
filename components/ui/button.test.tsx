import { render } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("renders as a button by default", () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders as a custom child if asChild is true", () => {
    const { getByText } = render(
      <Button asChild>
        <a href="/test">Test Link</a>
      </Button>
    );
    const link = getByText("Test Link");
    expect(link.tagName).toBe("A");
  });

  it("applies variant and size classNames", () => {
    const { getByRole } = render(
      <Button variant="outline" size="sm">
        Test
      </Button>
    );
    const button = getByRole("button");
    expect(button.className).toMatch(/border/);
    expect(button.className).toMatch(/h-8/);
  });
});
