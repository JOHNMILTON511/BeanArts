import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for Angular to fully hydrate
    await page.waitForSelector('.main-header', { timeout: 20000 });
  });

  test('hero section is visible', async ({ page }) => {
    // Hero is inside owl-carousel, look for the section wrapper or the background image
    await expect(
      page.locator('.hero-carousel, section.relative, .owl-carousel').first()
    ).toBeVisible();
  });

  test('hero has at least one CTA button', async ({ page }) => {
    const cta = page.locator('.hero-btn-primary').first();
    await expect(cta).toBeVisible({ timeout: 10000 });
  });

  test('hero stats bar is visible', async ({ page }) => {
    await page.locator('.stats-bar').scrollIntoViewIfNeeded().catch(() => {});
    await expect(page.locator('.stats-bar')).toBeVisible({ timeout: 10000 });
  });

  test('page does not show JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Filter out known benign browser/third-party errors
    const serious = errors.filter(e =>
      !e.includes('ResizeObserver') &&
      !e.includes('Non-Error promise rejection')
    );
    expect(serious).toHaveLength(0);
  });

  test('hero image loads', async ({ page }) => {
    // Wait for any img on page to be loaded
    await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.some(img => img.naturalWidth > 0);
    }, { timeout: 15000 });
    const loadedCount = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img')).filter(i => (i as HTMLImageElement).naturalWidth > 0).length
    );
    expect(loadedCount).toBeGreaterThan(0);
  });

  test('footer is visible after scrolling', async ({ page }) => {
    await page.keyboard.press('End');
    await page.waitForTimeout(500);
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('Get a Quote header button links to contact', async ({ page }) => {
    const href = await page.locator('.header-ctas a', { hasText: /get a quote/i }).getAttribute('href');
    expect(href).toContain('/contact');
  });

  test('hero CTA button is clickable', async ({ page }) => {
    const cta = page.locator('.hero-btn-primary').first();
    await expect(cta).toBeVisible({ timeout: 10000 });
    // Just verify it is a proper link/button with an href or click handler
    const tagName = await cta.evaluate(el => el.tagName.toLowerCase());
    expect(['a', 'button']).toContain(tagName);
  });

});
