import { test, expect } from "@playwright/test";

test.describe("Pagination navigation", () => {
  test("should navigate to next page", async ({ page }) => {
    await page.goto("/?page=1");

    const nextButton = page.getByRole("link", { name: "Next" });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    await expect(page).toHaveURL(/page=2/);
  });

  test("should show active page link", async ({ page }) => {
    await page.goto("/?page=3");
    const activePage = page.locator("a[aria-current='page']");
    await expect(activePage).toHaveText("3");
  });
});
