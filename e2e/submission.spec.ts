import { test, expect } from '@playwright/test';

test.describe('Submission flow', () => {
  test('submit page requires auth', async ({ page }) => {
    await page.goto('/dashboard/submit');
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('browse page loads', async ({ page }) => {
    await page.goto('/browse');
    await expect(page.getByText('Browse Tracks')).toBeVisible();
  });

  test('browse page shows genre filter', async ({ page }) => {
    await page.goto('/browse');
    await expect(page.getByText('All')).toBeVisible();
    await expect(page.getByText('electronic')).toBeVisible();
  });
});
