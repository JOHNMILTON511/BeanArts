import { test, expect } from '@playwright/test';

test.describe('Auth — Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('.auth-form, #email', { timeout: 30000 });
  });

  test('login page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sign In/i);
  });

  test('left brand panel is visible on desktop', async ({ page }) => {
    await expect(page.locator('.auth-left')).toBeVisible();
    await expect(page.locator('.auth-brand-name')).toContainText('BeanArts');
  });

  test('email and password fields are visible', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('Google Sign In button is visible', async ({ page }) => {
    await expect(page.locator('.btn-google')).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    // Angular marks fields as touched after submit — give change detection a tick
    await page.waitForTimeout(500);
    await expect(page.locator('.field-msg').first()).toBeVisible();
  });

  test('shows email validation error for invalid email', async ({ page }) => {
    await page.locator('#email').fill('not-an-email');
    await page.locator('#password').fill('somepassword');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.field-msg')).toContainText(/valid email/i);
  });

  test('password toggle shows/hides password', async ({ page }) => {
    await page.locator('#password').fill('mypassword');
    const toggle = page.locator('.field-toggle').first();
    await toggle.click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'text');
    await toggle.click();
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
  });

  test('Forgot password link navigates correctly', async ({ page }) => {
    await page.locator('.forgot-link').click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test('Create account link navigates to /register', async ({ page }) => {
    await page.locator('.auth-switch-link').click();
    await expect(page).toHaveURL(/\/register/);
  });

});

test.describe('Auth — Register Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('#displayName', { timeout: 30000 });
  });

  test('register page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Create Account/i);
  });

  test('all form fields are visible', async ({ page }) => {
    await expect(page.locator('#displayName')).toBeVisible();
    await expect(page.locator('#companyName')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    const msgs = page.locator('.field-msg');
    await expect(msgs.first()).toBeVisible();
  });

  test('shows password mismatch error', async ({ page }) => {
    await page.locator('#displayName').fill('Test User');
    await page.locator('#companyName').fill('Test Co');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('different456');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.field-msg')).toContainText(/do not match/i);
  });

  test('Sign in link navigates to /login', async ({ page }) => {
    await page.locator('.auth-switch-link').click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('Terms link is present', async ({ page }) => {
    await expect(page.locator('a[href*="terms"], a', { hasText: /terms/i }).first()).toBeVisible();
  });

});

test.describe('Auth — Forgot Password Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
    await page.waitForSelector('#email', { timeout: 30000 });
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Reset Password/i);
  });

  test('email field is visible', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
  });

  test('shows validation error on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.field-msg')).toBeVisible();
  });

  test('Back to Sign In link navigates to /login', async ({ page }) => {
    await page.locator('.auth-switch-link').click();
    await expect(page).toHaveURL(/\/login/);
  });

});
