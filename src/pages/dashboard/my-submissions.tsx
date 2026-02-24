import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { SubmissionList } from '@/components/dashboard/submission-list';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function MySubmissionsPage() {
  useDocumentTitle('My Submissions');
  const { user } = useAuth();
  const { data: submissions, isLoading, isError, error, refetch } = useArtistSubmissions(user?.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Submissions</h1>
      <p className="mt-2 text-hex-muted">All tracks you&apos;ve submitted to hexwave</p>

      {isError ? (
        <QueryError error={error} fallbackMessage="Failed to load submissions" onRetry={() => refetch()} />
      ) : isLoading ? (
        <SkeletonTable rows={5} />
      ) : !submissions?.length ? (
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
      ) : (
        <div className="mt-8">
          <SubmissionList submissions={submissions} />
        </div>
      )}
    </div>
  );
}
