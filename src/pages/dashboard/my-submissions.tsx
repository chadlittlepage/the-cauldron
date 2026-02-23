import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { SubmissionList } from '@/components/dashboard/submission-list';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function MySubmissionsPage() {
  const { user } = useAuth();
  const { data: submissions, isLoading, isError, error } = useArtistSubmissions(user?.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Submissions</h1>
      <p className="mt-2 text-hex-muted">All tracks you&apos;ve submitted to hexwave</p>

      {isError ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error instanceof Error ? error.message : 'Failed to load submissions'}</AlertDescription>
          </Alert>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
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
