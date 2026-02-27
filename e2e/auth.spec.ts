import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
  });

  test('signup page loads', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    await expect(page.getByPlaceholder('Your display name')).toBeVisible();
  });

  test('login form validates empty fields', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('signup form validates password requirements', async ({ page }) => {
    await page.goto('/signup');
    await page.getByPlaceholder('Your display name').fill('Test User');
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('At least 8 characters').fill('weak');
    await page.getByPlaceholder('Confirm your password').fill('weak');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText(/Password must/)).toBeVisible();
  });

  test('login links to signup', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('main').getByRole('link', { name: 'Create one' }).click();
    await expect(page).toHaveURL('/signup');
  });

  test('signup links to login', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('main').getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/login');
  });
});
