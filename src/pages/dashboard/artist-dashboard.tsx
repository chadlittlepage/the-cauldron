import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { StatCard } from '@/components/dashboard/stat-card';
import { SubmissionList } from '@/components/dashboard/submission-list';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Music, ThumbsUp, Clock, Plus } from 'lucide-react';

export function ArtistDashboardPage() {
  const { user, profile } = useAuth();
  const { data: submissions, isLoading } = useArtistSubmissions(user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalVotes = submissions?.reduce((sum, s) => sum + s.vote_count, 0) ?? 0;
  const pending = submissions?.filter((s) => s.status === 'pending' || s.status === 'in_review').length ?? 0;

  // If user is a curator, redirect them
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
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-hex-muted">Welcome back, {profile?.display_name}</p>
        </div>
        <Link to="/dashboard/submit">
          <Button variant="accent">
            <Plus className="h-4 w-4" />
            Submit Track
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Submissions" value={submissions?.length ?? 0} icon={<Music className="h-5 w-5" />} />
        <StatCard label="Total Votes" value={totalVotes} icon={<ThumbsUp className="h-5 w-5" />} />
        <StatCard label="Pending Review" value={pending} icon={<Clock className="h-5 w-5" />} />
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Submissions</h2>
          <Link to="/dashboard/submissions" className="text-sm text-accent-purple hover:underline">
            View all
          </Link>
        </div>
        {submissions?.length ? (
          <SubmissionList submissions={submissions.slice(0, 5)} className="mt-4" />
        ) : (
          <EmptyState
            icon={<Music className="h-12 w-12" />}
            title="No submissions yet"
            description="Submit your first track to get started."
            action={
              <Link to="/dashboard/submit">
                <Button variant="accent">Submit Track</Button>
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}
