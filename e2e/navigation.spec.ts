import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

  test('home page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BeanArts/i);
  });

  test('header logo is visible', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.header-logo');
    await expect(logo).toBeVisible();
  });

  test('header has Products link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.header-nav-link', { hasText: 'Products' })).toBeVisible();
  });

  test('header Sign In button is visible when logged out', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.header-ctas a', { hasText: /sign in/i })).toBeVisible();
  });

  test('About page loads', async ({ page }) => {
    await page.goto('/about');
    // Title contains BeanArts brand name (actual title varies)
    await expect(page).toHaveTitle(/BeanArts/i);
    await expect(page.locator('body')).not.toContainText('Page Not Found');
  });

  test('Services page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/Services/i);
    await expect(page.locator('body')).not.toContainText('Page Not Found');
  });

  test('Portfolio page loads', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page).toHaveTitle(/Portfolio/i);
  });

  test('Contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/i);
  });

  test('Blog page loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Insights/i);
  });

  test('Careers page loads', async ({ page }) => {
    await page.goto('/careers');
    await expect(page).toHaveTitle(/Careers/i);
  });

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveTitle(/FAQ/i);
  });

  test('Privacy Policy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page).toHaveTitle(/Privacy/i);
  });

  test('Terms page loads', async ({ page }) => {
    await page.goto('/terms-conditions');
    await expect(page).toHaveTitle(/Terms/i);
  });

  test('unknown route shows 404', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page).toHaveTitle(/Not Found/i);
  });

  test('Products nav link navigates to /products', async ({ page }) => {
    await page.goto('/');
    await page.locator('.header-nav-link', { hasText: 'Products' }).click();
    await expect(page).toHaveURL(/\/products/);
  });

  test('Sign In nav link navigates to /login', async ({ page }) => {
    await page.goto('/');
    await page.locator('.header-ctas a', { hasText: /sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('mobile menu opens on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const burger = page.locator('.header-burger');
    await expect(burger).toBeVisible();
    await burger.click();
    await expect(page.locator('.header-mobile-menu')).toBeVisible();
  });

});
