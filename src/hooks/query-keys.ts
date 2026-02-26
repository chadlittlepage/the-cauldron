export const queryKeys = {
  profiles: {
    all: ['profiles'] as const,
    detail: (id: string) => ['profiles', id] as const,
    curators: () => ['profiles', 'curators'] as const,
  },
  submissions: {
    all: ['submissions'] as const,
    list: (filters?: { genre?: string; status?: string; page?: number; search?: string }) =>
      ['submissions', 'list', filters] as const,
    detail: (id: string) => ['submissions', id] as const,
    byArtist: (artistId: string) => ['submissions', 'artist', artistId] as const,
    reviewQueue: (filters?: { page?: number; genre?: string; search?: string }) =>
      ['submissions', 'review-queue', filters] as const,
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
  artistAnalytics: {
    submissionsByMonth: (artistId: string) =>
      ['artist-analytics', 'submissions-by-month', artistId] as const,
    curatorDecisions: (artistId: string) =>
      ['artist-analytics', 'curator-decisions', artistId] as const,
    genreDistribution: (artistId: string) =>
      ['artist-analytics', 'genre-distribution', artistId] as const,
    voteHistory: (artistId: string) => ['artist-analytics', 'vote-history', artistId] as const,
    ratingsDistribution: (artistId: string) =>
      ['artist-analytics', 'ratings-distribution', artistId] as const,
    voteTrend: (artistId: string) => ['artist-analytics', 'vote-trend', artistId] as const,
    totalSpent: (artistId: string) => ['artist-analytics', 'total-spent', artistId] as const,
    placements: (artistId: string) => ['artist-analytics', 'placements', artistId] as const,
    tierBreakdown: (artistId: string) => ['artist-analytics', 'tier-breakdown', artistId] as const,
  },
  curatorAnalytics: {
    reviewsByMonth: (curatorId: string) =>
      ['curator-analytics', 'reviews-by-month', curatorId] as const,
    genrePerformance: (curatorId: string) =>
      ['curator-analytics', 'genre-performance', curatorId] as const,
    earningsByMonth: (curatorId: string) =>
      ['curator-analytics', 'earnings-by-month', curatorId] as const,
    payouts: (curatorId: string) => ['curator-analytics', 'payouts', curatorId] as const,
    stats: (curatorId: string) => ['curator-analytics', 'stats', curatorId] as const,
  },
  debug: {
    supabaseHealth: () => ['debug', 'supabaseHealth'] as const,
    edgeFunctionHealth: () => ['debug', 'edgeFunctionHealth'] as const,
    sentryIssues: () => ['debug', 'sentryIssues'] as const,
    tableData: (table: string, opts?: { id?: string; page?: number }) =>
      ['debug', 'tableData', table, opts] as const,
    auditLogs: (opts?: { action?: string; page?: number }) => ['debug', 'auditLogs', opts] as const,
  },
} as const;
