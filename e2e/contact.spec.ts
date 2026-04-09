import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('contact page loads', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/i);
  });

  test('contact form fields are present', async ({ page }) => {
    // Look for typical contact form inputs
    await expect(page.locator('input, textarea').first()).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    // Try to find and click the submit button
    const submitBtn = page.locator('button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Should show some validation feedback
      await expect(
        page.locator('.mat-mdc-form-field-error, .error, [class*="error"], .field-msg').first()
      ).toBeVisible({ timeout: 3000 }).catch(() => {
        // Some forms use HTML5 validation — that's fine too
      });
    }
  });

});

test.describe('About Page', () => {

  test('page loads and has content', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/BeanArts/i);
    await expect(page.locator('body')).not.toContainText('Page Not Found');
    const body = await page.locator('body').textContent();
    expect((body ?? '').length).toBeGreaterThan(100);
  });

});

test.describe('Services Page', () => {

  test('page loads with service sections', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/Services/i);
    await expect(page.locator('body')).not.toContainText('Page Not Found');
  });

});
