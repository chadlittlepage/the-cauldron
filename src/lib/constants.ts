import type { UserRole, SubmissionStatus, MusicPlatform } from '@/types/database';

export const GENRES = [
  'electronic',
  'hip-hop',
  'rock',
  'pop',
  'r&b',
  'jazz',
  'classical',
  'folk',
  'country',
  'metal',
  'punk',
  'indie',
  'ambient',
  'experimental',
  'world',
  'latin',
  'reggae',
  'blues',
  'soul',
  'other',
] as const;

export type Genre = (typeof GENRES)[number];

export const PLATFORMS: { value: MusicPlatform; label: string }[] = [
  { value: 'spotify', label: 'Spotify' },
  { value: 'soundcloud', label: 'SoundCloud' },
  { value: 'bandcamp', label: 'Bandcamp' },
  { value: 'other', label: 'Other' },
];

export const ROLES: { value: UserRole; label: string }[] = [
  { value: 'artist', label: 'Artist' },
  { value: 'curator', label: 'Curator' },
  { value: 'admin', label: 'Admin' },
];

export const STATUSES: { value: SubmissionStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'in_review', label: 'In Review', color: 'default' },
  { value: 'accepted', label: 'Accepted', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'error' },
];

export const SUBMISSION_FEE_CENTS = 200;
export const SUBMISSION_FEE_DISPLAY = '$2.00';
export const CURATOR_MIN_LISTENERS = 1000;
export const ITEMS_PER_PAGE = 20;
