import { test, expect, type Page } from '@playwright/test';

/**
 * Authenticated E2E tests covering the core happy path:
 * login → submit track → browse → vote → dashboard
 *
 * Requires E2E_EMAIL and E2E_PASSWORD env vars pointing to a test account.
 * The test account should have role 'artist' in the profiles table.
 */

const E2E_EMAIL = process.env.E2E_EMAIL ?? '';
const E2E_PASSWORD = process.env.E2E_PASSWORD ?? '';

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill(E2E_EMAIL);
  await page.getByPlaceholder('Enter your password').fill(E2E_PASSWORD);
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  // Wait for redirect to dashboard after login
  await page.waitForURL('/dashboard', { timeout: 15000 });
}

test.describe('Authenticated flows', () => {
  test.skip(!E2E_EMAIL || !E2E_PASSWORD, 'E2E_EMAIL and E2E_PASSWORD env vars required');

  test('can log in and see dashboard', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('can access submit track page', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/submit');
    await expect(page.getByRole('heading', { name: /Submit/ })).toBeVisible();
    await expect(page.getByPlaceholder(/spotify/i)).toBeVisible();
  });

  test('submit form validates track URL', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard/submit');
    // Click Continue without entering a URL
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Track URL is required')).toBeVisible({
      timeout: 5000,
    });
  });

  test('can browse tracks while authenticated', async ({ page }) => {
    await login(page);
    await page.goto('/browse');
    await expect(page.getByRole('heading', { name: 'Browse Tracks' })).toBeVisible();
    // Genre filter should be visible
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  });

  test('can vote on a track from browse', async ({ page }) => {
    await login(page);
    await page.goto('/browse');
    await expect(page.getByRole('heading', { name: 'Browse Tracks' })).toBeVisible();

    // Find the first vote button if tracks exist
    const voteButtons = page.locator('button[aria-label*="vote" i], button[aria-label*="Vote" i]');
    const count = await voteButtons.count();
    if (count > 0) {
      await voteButtons.first().click();
      // Should not show an auth error (we're logged in)
      await expect(page.getByText(/session expired/i)).not.toBeVisible({ timeout: 3000 });
    }
  });

  test('can view track detail page', async ({ page }) => {
    await login(page);
    await page.goto('/browse');

    // Click the first track card link if it exists
    const trackLinks = page.locator('a[href^="/track/"]');
    const count = await trackLinks.count();
    if (count > 0) {
      await trackLinks.first().click();
      await page.waitForURL(/\/track\//);
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('dashboard tabs are navigable', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard');

    // Check that tabs exist
    await expect(page.getByRole('tab', { name: 'Submissions' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Analytics' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Voting History' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Settings' })).toBeVisible();

    // Click Analytics tab
    await page.getByRole('tab', { name: 'Analytics' }).click();
    // Should not error out
    await expect(page.getByText(/session expired|failed to load/i)).not.toBeVisible({
      timeout: 3000,
    });
  });

  test('profile settings page loads', async ({ page }) => {
    await login(page);
    await page.goto('/settings/profile');
    await expect(page.getByRole('heading', { name: /Profile Settings/i })).toBeVisible({
      timeout: 10000,
    });
    // Display name field should be pre-filled
    const nameInput = page.getByLabel(/display name/i);
    await expect(nameInput).toBeVisible();
    await expect(nameInput).not.toBeEmpty();
  });

  test('can log out', async ({ page }) => {
    await login(page);
    await page.goto('/dashboard');
    // Desktop: icon-only button with aria-label
    const signOutButton = page.getByRole('button', { name: /sign out/i });
    await signOutButton.click();
    // Should redirect to home or login
    await page.waitForURL(/^\/$|\/login/, { timeout: 10000 });
  });
});
