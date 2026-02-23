import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/hexwave/i);
});

test('navigation is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
});
