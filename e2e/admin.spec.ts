import { test, expect } from '@playwright/test';

test.describe('Admin', () => {
  test('admin dashboard requires auth', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL('/login');
  });

  test('404 page renders', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
  });
});
