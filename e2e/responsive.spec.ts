import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile S',  width: 375,  height: 812 },
  { name: 'Mobile L',  width: 430,  height: 932 },
  { name: 'Tablet',    width: 768,  height: 1024 },
  { name: 'Desktop',   width: 1280, height: 800 },
];

for (const vp of viewports) {
  test.describe(`Responsive — ${vp.name} (${vp.width}px)`, () => {

    test.use({
      viewport: { width: vp.width, height: vp.height },
      navigationTimeout: 60000,
    });

    test('home page renders without horizontal scroll', async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(1000);
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // 5px tolerance
    });

    test('login page renders correctly', async ({ page }) => {
      await page.goto('/login');
      await expect(page.locator('#email')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('products page renders correctly', async ({ page }) => {
      await page.goto('/products');
      await expect(page.locator('.products-title')).toBeVisible();
      await expect(page.locator('.category-tabs')).toBeVisible();
    });

    test('header is visible', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('.main-header')).toBeVisible();
    });

  });
}

test.describe('Mobile — auth pages hide left panel', () => {

  test.use({ viewport: { width: 375, height: 812 } });

  test('login left panel is hidden on mobile', async ({ page }) => {
    await page.goto('/login');
    const leftPanel = page.locator('.auth-left');
    // On mobile the left panel should be display:none
    const isHidden = await leftPanel.evaluate(el => getComputedStyle(el).display === 'none');
    expect(isHidden).toBe(true);
  });

});
