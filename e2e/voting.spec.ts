import { test, expect } from '@playwright/test';

test.describe('Voting', () => {
  test('track detail page handles missing track', async ({ page }) => {
    await page.goto('/track/nonexistent-id');
    // Nonexistent track IDs trigger a query error from Supabase
    await expect(page.getByText('Failed to load track')).toBeVisible({ timeout: 15000 });
  });
});
