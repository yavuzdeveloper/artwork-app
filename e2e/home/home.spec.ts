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

test.describe("Home Page Pagination", () => {
  test("should disable Previous button on first page", async ({ page }) => {
    await page.goto("/?page=1");

    const prevButton = page.getByRole("link", { name: "Previous" });
    await expect(prevButton).toHaveClass(/pointer-events-none|opacity-50/);
    await expect(prevButton).toBeVisible();
  });

  test("should disable Next button on last page", async ({ page }) => {
    // Get the total number of pages
    await page.goto("/?page=1");

    const pageIndicator = page.locator("text=Page").first();
    const text = await pageIndicator.textContent();
    const match = text?.match(/Page \d+ of (\d+)/);
    const totalPages = match ? parseInt(match[1]) : 1;

    await page.goto(`/?page=${totalPages}`);

    const nextButton = page.getByRole("link", { name: "Next" });
    await expect(nextButton).toHaveClass(/pointer-events-none|opacity-50/);
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

  test("should show current page", async ({ page }) => {
    await page.goto("/?page=2");

    // test that the page is loaded
    const activePageLink = page.getByRole("link", { name: "2" });
    await expect(activePageLink).toHaveAttribute("aria-current", "page");
    await expect(activePageLink).toBeVisible();
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

test("should search when input is submitted", async ({ page }) => {
  await page.goto("/");

  // select the Search
  const openSearchButton = page.locator('[data-testid="search-button"]');
  await openSearchButton.click();

  // wait for the search input to be visible
  const searchInput = page.locator('[data-testid="search-input"]');
  await expect(searchInput).toBeVisible();

  // Do the search
  await searchInput.fill("van gogh");
  await searchInput.press("Enter");

  // wait for the search results to be displayed
  await expect(page).toHaveURL(/search=van(\+|%20)gogh/);

  // check that the search results are displayed
  const artworkCard = page.locator('[data-testid="artwork-card"]');
  const emptyState = page.locator('[data-testid="empty-state"]');

  await expect(artworkCard.first().or(emptyState)).toBeVisible();
});

// Detail Page
test("should navigate to artwork detail page", async ({ page }) => {
  await page.goto("/");

  const firstCard = page.locator('[data-testid="artwork-card"]').first();
  await firstCard.click();

  await expect(page).toHaveURL(/\/artwork\/\d+/); // if the URL contains /artwork/:id
  await expect(page.locator("h2")).toBeVisible(); // if the title is visible
});

test("should show error or fallback UI on invalid artwork ID", async ({
  page,
}) => {
  await page.goto("/artwork/999999999999"); // assumed to be invalid

  const errorMessage = page.locator('[data-testid="error-container"]');
  await expect(errorMessage).toBeVisible();
});

// Mobile
test.use({ viewport: { width: 375, height: 812 } }); // iPhone X size

test("should display mobile-friendly layout", async ({ page }) => {
  await page.goto("/");

  // test that the page is loaded
  await expect(page.locator("nav")).toBeVisible();

  const artworkCard = page.locator('[data-testid="artwork-card"]');

  // test that at least one artwork card is visible
  await expect(artworkCard.first()).toBeVisible();
});

// Browser Back
test("should go back to home when browser back is used", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-testid="artwork-card"]').first().click();

  await expect(page).toHaveURL(/\/artwork\/\d+/);
  await page.goBack();
  await expect(page).toHaveURL("/");
});

// Footer
test("footer should render and contain expected links", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer).toBeVisible();

  const year = new Date().getFullYear();
  await expect(footer).toContainText(`© ${year} Art Collection by`);

  const linkedin = footer.getByRole("link", { name: /Yavuz Tokus/i });
  await expect(linkedin).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/yavuztokus/"
  );

  const github = footer.getByRole("link", { name: "GitHub" });
  await expect(github).toHaveAttribute(
    "href",
    "https://github.com/yavuzdeveloper"
  );
});
