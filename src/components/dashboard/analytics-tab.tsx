import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import {
  useArtistSubmissionsByMonth,
  useArtistCuratorDecisions,
  useArtistGenreDistribution,
  useArtistRatingsDistribution,
  useArtistVoteTrend,
  useArtistTotalSpent,
  useArtistPlacements,
  useArtistTierBreakdown,
} from '@/hooks/use-artist-analytics';
import { StatCard } from '@/components/dashboard/stat-card';
import { BarChart, StackedBarChart, HorizontalBarChart } from '@/components/dashboard/bar-chart';
import { FunnelChart } from '@/components/dashboard/funnel-chart';
import {
  Music,
  DollarSign,
  TrendingUp,
  Award,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

export function AnalyticsTab() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: submissions } = useArtistSubmissions(user?.id);
  const { data: monthlyData } = useArtistSubmissionsByMonth(user?.id);
  const { data: decisions } = useArtistCuratorDecisions(user?.id);
  const { data: genres } = useArtistGenreDistribution(user?.id);
  const { data: ratings } = useArtistRatingsDistribution(user?.id);
  const { data: voteTrend } = useArtistVoteTrend(user?.id);
  const { data: totalSpentCents } = useArtistTotalSpent(user?.id);
  const { data: placements } = useArtistPlacements(user?.id);
  const { data: tierData } = useArtistTierBreakdown(user?.id);

  const totalSubmissions = submissions?.length ?? 0;
  const totalSpent = ((totalSpentCents ?? 0) / 100).toFixed(2);
  const accepted = submissions?.filter((s) => s.status === 'accepted').length ?? 0;
  const reviewed = submissions?.filter((s) => s.status !== 'pending').length ?? 0;
  const acceptanceRate = reviewed > 0 ? Math.round((accepted / reviewed) * 100) : 0;
  const placementCount = placements ?? 0;

  const totalVotes = submissions?.reduce((sum, s) => sum + s.vote_count, 0) ?? 0;
  const avgRating =
    ratings && ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.rating * r.count, 0) /
          ratings.reduce((sum, r) => sum + r.count, 0)
        ).toFixed(1)
      : '0.0';

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ['artist-analytics'] });
    queryClient.invalidateQueries({ queryKey: ['submissions'] });
  }

  const submissionMonths = (monthlyData ?? []).map((d) => ({
    label: d.month.slice(5),
    value: d.count,
  }));

  const decisionMonths = (decisions ?? []).map((d) => ({
    label: d.month.slice(5),
    accepted: d.accepted,
    rejected: d.rejected,
    pending: d.pending,
  }));

  const genreData = (genres ?? []).map((d) => ({
    label: d.genre,
    value: d.count,
  }));

  const voteTrendData = (voteTrend ?? []).map((d) => ({
    label: d.day,
    value: d.upvotes,
  }));

  // Build full 1-5 star ratings data
  const ratingsData = [1, 2, 3, 4, 5].map((star) => ({
    label: `${star}\u2605`,
    value: ratings?.find((r) => r.rating === star)?.count ?? 0,
  }));

  const funnelData = [
    { label: 'Submitted', value: totalSubmissions, color: '#4a556c' },
    { label: 'Reviewed', value: reviewed, color: '#6366f1' },
    { label: 'Accepted', value: accepted, color: '#22c55e' },
    { label: 'Placed', value: placementCount as number, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p className="text-sm text-hex-muted">
            Your submission performance over the last 6 months
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Submissions"
          value={totalSubmissions}
          icon={<Music className="h-5 w-5" />}
        />
        <StatCard
          label="Total Spent"
          value={`$${totalSpent}`}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Acceptance Rate"
          value={`${acceptanceRate}%`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          label="Placements"
          value={placementCount as number}
          icon={<Award className="h-5 w-5" />}
        />
      </div>

      {/* Submissions Over Time + Curator Decisions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Submissions Over Time</h4>
            <span className="text-sm font-bold text-accent-purple">{totalSubmissions}</span>
          </div>
          {submissionMonths.length > 0 ? (
            <BarChart data={submissionMonths} color="#4a556c" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No submission data yet</p>
          )}
        </div>

        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-4">Curator Decisions</h4>
          {decisionMonths.length > 0 ? (
            <>
              <StackedBarChart
                height={180}
                data={decisionMonths.map((d) => ({
                  label: d.label,
                  segments: [
                    { value: d.accepted, color: '#22c55e' },
                    { value: d.rejected, color: '#ef4444' },
                    { value: d.pending, color: '#eab308' },
                  ],
                }))}
              />
              <div className="mt-4 flex gap-4 text-xs text-hex-muted">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-green-500" /> Accepted
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-red-500" /> Rejected
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-yellow-500" /> Pending
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No decisions yet</p>
          )}
        </div>
      </div>

      {/* Genre Distribution + Tier Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-4">Genre Distribution</h4>
          {genreData.length > 0 ? (
            <BarChart data={genreData} color="#6366f1" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">No genre data available</p>
          )}
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Tier Breakdown</h4>
            <span className="text-sm text-hex-muted">
              Total: ${((tierData ?? []).reduce((s, t) => s + t.total_cents, 0) / 100).toFixed(2)}
            </span>
          </div>
          <HorizontalBarChart
            data={['T1', 'T2', 'T3'].map((t) => ({
              label: t,
              value: tierData?.find((d) => d.tier === t)?.count ?? 0,
            }))}
            color="#a855f7"
          />
        </div>
      </div>

      {/* Featured Track Votes + Ratings Received */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Featured Track Votes</h4>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-green-400">
                <ThumbsUp className="h-3.5 w-3.5" /> {totalVotes}
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <ThumbsDown className="h-3.5 w-3.5" /> 0
              </span>
            </div>
          </div>
          {voteTrendData.length > 0 ? (
            <BarChart data={voteTrendData} color="#22c55e" height={180} />
          ) : (
            <p className="text-sm text-hex-muted py-8 text-center">
              No vote data in the last 14 days
            </p>
          )}
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Ratings Received</h4>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">{avgRating}</span>
            </div>
          </div>
          <BarChart data={ratingsData} color="#f59e0b" height={180} />
        </div>
      </div>

      {/* Submission Funnel */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="text-sm font-semibold mb-4">Submission Funnel</h4>
        <FunnelChart data={funnelData} />
      </div>
    </div>
  );
}
