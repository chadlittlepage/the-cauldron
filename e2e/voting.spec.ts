import { test, expect } from '@playwright/test';

test.describe('Voting', () => {
  test('track detail page handles missing track', async ({ page }) => {
    await page.goto('/track/nonexistent-id');
    await expect(page.getByText('Track not found')).toBeVisible();
  });
});
