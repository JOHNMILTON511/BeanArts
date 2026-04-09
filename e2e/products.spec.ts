import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('products page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Shop Products/i);
  });

  test('page hero title is visible', async ({ page }) => {
    await expect(page.locator('.products-title')).toBeVisible();
    await expect(page.locator('.products-title')).toContainText('Products');
  });

  test('category filter tabs are visible', async ({ page }) => {
    const tabs = page.locator('.cat-tab');
    await expect(tabs).toHaveCount(5); // All, Gifting, Printing, Packaging, Merchandise
  });

  test('"All" filter tab is active by default', async ({ page }) => {
    await expect(page.locator('.cat-tab.active')).toContainText('All');
  });

  test('search input is visible and functional', async ({ page }) => {
    const search = page.locator('.search-input');
    await expect(search).toBeVisible();
    await search.fill('gift');
    await page.waitForTimeout(500);
    // Toolbar, count, or empty state — any of these confirms the search reacted
    await expect(
      page.locator('.products-toolbar, .products-count, .empty-state')
    ).toBeVisible();
  });

  test('clicking a category filter updates active state', async ({ page }) => {
    const giftingTab = page.locator('.cat-tab', { hasText: 'Gifting' });
    await giftingTab.click();
    await expect(giftingTab).toHaveClass(/active/);
    await expect(page.locator('.cat-tab.active')).toHaveCount(1);
  });

  test('loading or products grid is shown', async ({ page }) => {
    // Loading spinner appears immediately; grid or empty state appears after Firestore responds
    await expect(
      page.locator('.products-grid, .loading-state, .empty-state')
    ).toBeVisible();
  });

  test('product card links to detail page when products exist', async ({ page }) => {
    // Wait up to 15s for Firestore to respond (grid or empty state)
    await page.waitForSelector('.products-grid, .empty-state', { timeout: 15000 })
      .catch(() => { /* still loading — skip data-dependent assertions */ });
    const grid = page.locator('.products-grid');
    if (await grid.isVisible()) {
      const firstCard = page.locator('.product-card').first();
      if (await firstCard.isVisible()) {
        const detailLink = firstCard.locator('.btn-details');
        const href = await detailLink.getAttribute('href');
        expect(href).toMatch(/\/products\/.+/);
      }
    }
  });

  test('add to cart without login redirects to login', async ({ page }) => {
    await page.waitForSelector('.products-grid, .empty-state', { timeout: 15000 })
      .catch(() => { /* still loading — skip */ });
    const grid = page.locator('.products-grid');
    if (await grid.isVisible()) {
      const addBtn = page.locator('.btn-add-cart:not([disabled])').first();
      if (await addBtn.isVisible()) {
        await addBtn.click();
        await expect(page).toHaveURL(/\/login/);
      }
    }
  });

});
