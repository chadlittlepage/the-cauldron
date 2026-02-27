import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    displayName: z
      .string()
      .min(2, 'Display name must be at least 2 characters')
      .max(50, 'Display name must be 50 characters or less'),
    role: z.enum(['artist', 'curator']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be 50 characters or less'),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional().or(z.literal('')),
  avatarUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  listenerCount: z.number().int().min(0).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const platformPatterns = {
  spotify: /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/,
  soundcloud: /^https:\/\/soundcloud\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/,
  bandcamp: /^https:\/\/[a-zA-Z0-9_-]+\.bandcamp\.com\/track\/[a-zA-Z0-9_-]+/,
  other: /^https?:\/\/.+/,
} as const;

export type DetectedPlatform = 'spotify' | 'soundcloud' | 'bandcamp' | 'other' | null;

/** Detects the music platform from a URL (Spotify, SoundCloud, Bandcamp, or generic). */
export function detectPlatform(url: string): DetectedPlatform {
  if (!url) return null;
  if (platformPatterns.spotify.test(url)) return 'spotify';
  if (platformPatterns.soundcloud.test(url)) return 'soundcloud';
  if (platformPatterns.bandcamp.test(url)) return 'bandcamp';
  if (platformPatterns.other.test(url)) return 'other';
  return null;
}

export const trackUrlSchema = z
  .object({
    url: z.string().url('Please enter a valid URL'),
    platform: z.enum(['spotify', 'soundcloud', 'bandcamp', 'other']),
  })
  .refine(
    (data) => {
      const pattern = platformPatterns[data.platform];
      return pattern.test(data.url);
    },
    {
      message: 'URL does not match the selected platform format',
      path: ['url'],
    },
  );

export const submissionSchema = z.object({
  trackTitle: z
    .string()
    .min(1, 'Track title is required')
    .max(200, 'Track title must be 200 characters or less'),
  artistName: z.string().max(200).optional().default(''),
  trackUrl: z.string().url('Please enter a valid track URL'),
  platform: z.enum(['spotify', 'soundcloud', 'bandcamp', 'other']),
  genre: z.string().min(1, 'Genre is required'),
  description: z
    .string()
    .max(1000, 'Description must be 1000 characters or less')
    .optional()
    .or(z.literal('')),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  feedback: z
    .string()
    .min(20, 'Feedback must be at least 20 characters')
    .max(2000, 'Feedback must be 2000 characters or less'),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
