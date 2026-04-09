import { test, expect } from '@playwright/test';

test.describe('Route Guards', () => {

  test('visiting /dashboard redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /dashboard/orders redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/orders');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /dashboard/cart redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/cart');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /dashboard/checkout redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/checkout');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /dashboard/profile redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/profile');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /admin redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('visiting /admin/orders redirects to /login when not authenticated', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForURL(/\/login/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('/login page is accessible without auth', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('#email')).toBeVisible();
  });

  test('/register page is accessible without auth', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveURL(/\/register/);
    await expect(page.locator('#email')).toBeVisible();
  });

  test('/products page is accessible without auth', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('.products-title')).toBeVisible();
  });

});
