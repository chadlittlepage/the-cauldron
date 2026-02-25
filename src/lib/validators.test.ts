import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  signupSchema,
  profileSchema,
  submissionSchema,
  reviewSchema,
  trackUrlSchema,
} from './validators';

describe('loginSchema', () => {
  it('validates a correct login', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'Password1' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-email', password: 'Password1' });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'short' });
    expect(result.success).toBe(false);
  });
});

describe('signupSchema', () => {
  const validSignup = {
    email: 'test@example.com',
    password: 'Password1',
    confirmPassword: 'Password1',
    displayName: 'Test User',
    role: 'artist' as const,
  };

  it('validates a correct signup', () => {
    const result = signupSchema.safeParse(validSignup);
    expect(result.success).toBe(true);
  });

  it('rejects mismatched passwords', () => {
    const result = signupSchema.safeParse({ ...validSignup, confirmPassword: 'Different1' });
    expect(result.success).toBe(false);
  });

  it('rejects password without uppercase', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'password1',
      confirmPassword: 'password1',
    });
    expect(result.success).toBe(false);
  });

  it('rejects password without number', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'Password',
      confirmPassword: 'Password',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short display name', () => {
    const result = signupSchema.safeParse({ ...validSignup, displayName: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid role', () => {
    const result = signupSchema.safeParse({ ...validSignup, role: 'hacker' });
    expect(result.success).toBe(false);
  });
});

describe('profileSchema', () => {
  it('validates a correct profile', () => {
    const result = profileSchema.safeParse({ displayName: 'Cool Artist', bio: 'I make music' });
    expect(result.success).toBe(true);
  });

  it('allows empty bio', () => {
    const result = profileSchema.safeParse({ displayName: 'Cool Artist', bio: '' });
    expect(result.success).toBe(true);
  });

  it('rejects bio over 500 chars', () => {
    const result = profileSchema.safeParse({ displayName: 'Cool Artist', bio: 'x'.repeat(501) });
    expect(result.success).toBe(false);
  });
});

describe('trackUrlSchema', () => {
  it('validates a Spotify URL', () => {
    const result = trackUrlSchema.safeParse({
      url: 'https://open.spotify.com/track/abc123',
      platform: 'spotify',
    });
    expect(result.success).toBe(true);
  });

  it('validates a SoundCloud URL', () => {
    const result = trackUrlSchema.safeParse({
      url: 'https://soundcloud.com/artist-name/track-name',
      platform: 'soundcloud',
    });
    expect(result.success).toBe(true);
  });

  it('validates a Bandcamp URL', () => {
    const result = trackUrlSchema.safeParse({
      url: 'https://artist.bandcamp.com/track/my-song',
      platform: 'bandcamp',
    });
    expect(result.success).toBe(true);
  });

  it('rejects mismatched platform and URL', () => {
    const result = trackUrlSchema.safeParse({
      url: 'https://soundcloud.com/artist/track',
      platform: 'spotify',
    });
    expect(result.success).toBe(false);
  });
});

describe('submissionSchema', () => {
  it('validates a correct submission', () => {
    const result = submissionSchema.safeParse({
      trackTitle: 'My Song',
      trackUrl: 'https://open.spotify.com/track/abc123',
      platform: 'spotify',
      genre: 'electronic',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty track title', () => {
    const result = submissionSchema.safeParse({
      trackTitle: '',
      trackUrl: 'https://open.spotify.com/track/abc123',
      platform: 'spotify',
      genre: 'electronic',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid URL', () => {
    const result = submissionSchema.safeParse({
      trackTitle: 'My Song',
      trackUrl: 'not-a-url',
      platform: 'spotify',
      genre: 'electronic',
    });
    expect(result.success).toBe(false);
  });
});

describe('reviewSchema', () => {
  it('validates a correct review', () => {
    const result = reviewSchema.safeParse({
      rating: 4,
      feedback: 'This is a great track with solid production value.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects rating below 1', () => {
    const result = reviewSchema.safeParse({
      rating: 0,
      feedback: 'This is detailed feedback text.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects rating above 5', () => {
    const result = reviewSchema.safeParse({
      rating: 6,
      feedback: 'This is detailed feedback text.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short feedback', () => {
    const result = reviewSchema.safeParse({ rating: 3, feedback: 'Too short' });
    expect(result.success).toBe(false);
  });
});
