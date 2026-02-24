export const queryKeys = {
  profiles: {
    all: ['profiles'] as const,
    detail: (id: string) => ['profiles', id] as const,
    curators: () => ['profiles', 'curators'] as const,
  },
  submissions: {
    all: ['submissions'] as const,
    list: (filters?: { genre?: string; status?: string; page?: number }) =>
      ['submissions', 'list', filters] as const,
    detail: (id: string) => ['submissions', id] as const,
    byArtist: (artistId: string) => ['submissions', 'artist', artistId] as const,
    reviewQueue: (filters?: { page?: number }) => ['submissions', 'review-queue', filters] as const,
  },
  votes: {
    all: ['votes'] as const,
    bySubmission: (submissionId: string) => ['votes', 'submission', submissionId] as const,
    hasVoted: (submissionId: string, userId: string) =>
      ['votes', 'has-voted', submissionId, userId] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    bySubmission: (submissionId: string) => ['reviews', 'submission', submissionId] as const,
    byCurator: (curatorId: string) => ['reviews', 'curator', curatorId] as const,
  },
  charts: {
    all: ['charts'] as const,
    byPeriod: (type: string, period: string) => ['charts', type, period] as const,
    periods: () => ['charts', 'periods'] as const,
  },
  payments: {
    all: ['payments'] as const,
    byUser: (userId: string) => ['payments', 'user', userId] as const,
  },
  admin: {
    stats: () => ['admin', 'stats'] as const,
    allSubmissions: (filters?: { status?: string; page?: number }) =>
      ['admin', 'submissions', filters] as const,
    allCurators: (filters?: { page?: number }) => ['admin', 'curators', filters] as const,
    allPayouts: (filters?: { page?: number }) => ['admin', 'payouts', filters] as const,
    analytics: () => ['admin', 'analytics'] as const,
  },
} as const;
