import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load and display artwork grid or empty state", async ({
    page,
  }) => {
    await page.goto("/");

    // test that the page is loaded
    await expect(page).toHaveURL("/");
    await expect(page.locator("main")).toBeVisible();

    // test that either the artwork grid or the empty state is visible
    const artworkCards = page.locator('[data-testid="artwork-card"]');
    const emptyState = page.locator('[data-testid="empty-state"]');

    // At least one artwork card should be visible
    await expect(artworkCards.first().or(emptyState)).toBeVisible();
  });
});

// Pagination
test.describe("Home Page Pagination", () => {
  test("should disable Previous button on first page", async ({ page }) => {
    await page.goto("/?page=1");

    const prevButton = page.getByText("Previous");
    await expect(prevButton).toHaveClass(/text-gray-400/); // disabled class
    await expect(prevButton).toBeVisible();
  });

  test("should disable Next button on last page", async ({ page }) => {
    await page.goto("/?page=1");

    // Get total pages from the indicator
    const pageIndicator = page.locator("text=Page").first();
    const text = await pageIndicator.textContent(); // "Page 1 of 7"
    const match = text?.match(/Page \d+ of (\d+)/);
    const totalPages = match ? parseInt(match[1]) : 1;

    // go to last page
    await page.goto(`/?page=${totalPages}`);

    const nextButton = page.getByText("Next");
    await expect(nextButton).toHaveClass(/text-gray-400/); // disabled class
  });

  test("should navigate to next page when Next is clicked", async ({
    page,
  }) => {
    await page.goto("/?page=1");

    const nextButton = page.getByRole("link", { name: "Next" });
    await nextButton.click();

    await expect(page).toHaveURL("/?page=2");
  });

  test("should navigate to previous page when Previous is clicked", async ({
    page,
  }) => {
    await page.goto("/?page=2");

    const prevButton = page.getByRole("link", { name: "Previous" });
    await prevButton.click();

    await expect(page).toHaveURL("/?page=1");
  });

  test("should show current page and total", async ({ page }) => {
    await page.goto("/?page=2");

    const pageIndicator = page.locator("text=Page 2 of");
    await expect(pageIndicator).toBeVisible();
  });
});

// Search
test("should display filtered results when search query is used", async ({
  page,
}) => {
  await page.goto("/?search=monet");

  const results = page.locator('[data-testid="artwork-card"]');
  const count = await results.count();
  expect(count).toBeGreaterThan(0);

  await expect(page).toHaveURL(/search=monet/);
});

test("should show empty state if no search results found", async ({ page }) => {
  await page.goto("/?search=asldkjasldkj");

  const empty = page.locator('[data-testid="empty-state"]');
  await expect(empty).toBeVisible();
});

// Detail Page
test("should navigate to artwork detail page", async ({ page }) => {
  await page.goto("/");

  const firstCard = page.locator('[data-testid="artwork-card"]').first();
  await firstCard.click();

  await expect(page).toHaveURL(/\/artwork\/\d+/); // if the URL contains /artwork/:id
  await expect(page.locator("h2")).toBeVisible(); // if the title is visible
});
