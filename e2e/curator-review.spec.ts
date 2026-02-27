import { test, expect } from '@playwright/test';

test.describe('Curator review', () => {
  test('review queue requires auth', async ({ page }) => {
    await page.goto('/dashboard/review-queue');
    await expect(page).toHaveURL('/login');
  });

  test('curators page loads', async ({ page }) => {
    await page.goto('/curators');
    await expect(page.getByRole('heading', { name: 'Curators' })).toBeVisible({ timeout: 15000 });
  });
});
