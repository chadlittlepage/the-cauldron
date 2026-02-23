import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { StatCard } from '@/components/dashboard/stat-card';
import { SubmissionList } from '@/components/dashboard/submission-list';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Music, ThumbsUp, Clock, Plus, ArrowRight, LayoutDashboard } from 'lucide-react';

export function ArtistDashboardPage() {
  const { user, profile } = useAuth();
  const { data: submissions, isLoading } = useArtistSubmissions(user?.id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-hex-muted">Loading dashboard...</p>
      </div>
    );
  }

  const totalVotes = submissions?.reduce((sum, s) => sum + s.vote_count, 0) ?? 0;
  const pending =
    submissions?.filter((s) => s.status === 'pending' || s.status === 'in_review').length ?? 0;

  if (profile?.role === 'curator') {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-hex-muted">
          Looking for your curator dashboard?{' '}
          <Link to="/dashboard/curator" className="text-accent-purple hover:underline">
            Go to Curator Dashboard
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple/10">
              <LayoutDashboard className="h-5 w-5 text-accent-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-hex-muted">Welcome back, {profile?.display_name}</p>
            </div>
          </div>
          <Link to="/dashboard/submit">
            <Button variant="accent" className="gap-2 group">
              <Plus className="h-4 w-4" />
              Submit Track
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <StatCard
            label="Total Submissions"
            value={submissions?.length ?? 0}
            icon={<Music className="h-5 w-5" />}
          />
          <StatCard
            label="Total Votes"
            value={totalVotes}
            icon={<ThumbsUp className="h-5 w-5" />}
          />
          <StatCard
            label="Pending Review"
            value={pending}
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        {/* Submissions */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Recent Submissions</h2>
            <Link
              to="/dashboard/submissions"
              className="flex items-center gap-1 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {submissions?.length ? (
            <SubmissionList submissions={submissions.slice(0, 5)} />
          ) : (
            <EmptyState
              icon={<Music className="h-10 w-10" />}
              title="No submissions yet"
              description="Submit your first track to get started on hexwave."
              action={
                <Link to="/dashboard/submit">
                  <Button variant="accent" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Submit Track
                  </Button>
                </Link>
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}
