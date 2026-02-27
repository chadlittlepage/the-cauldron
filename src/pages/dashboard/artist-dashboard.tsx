import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Tabs } from '@/components/ui/tabs';
import { SubmissionsTab } from '@/components/dashboard/submissions-tab';
import { AnalyticsTab } from '@/components/dashboard/analytics-tab';
import { VotingHistoryTab } from '@/components/dashboard/voting-history-tab';
import { SettingsTab } from '@/components/dashboard/settings-tab';
import { Button } from '@/components/ui/button';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonStats } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Plus, LayoutDashboard, ClipboardList, FileText, ArrowRight } from 'lucide-react';

export function ArtistDashboardPage() {
  useDocumentTitle('Dashboard');
  const { user, profile } = useAuth();
  const { isLoading, isError, error, refetch } = useArtistSubmissions(user?.id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <SkeletonStats />
      </div>
    );
  }

  if (isError) {
    const message = error instanceof Error ? error.message : 'Failed to load dashboard';
    const isAuthError =
      message.includes('JWT') ||
      message.includes('token') ||
      message.includes('auth') ||
      message.includes('lock');

    if (isAuthError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Alert variant="error" className="max-w-md">
            <AlertTitle>Session expired</AlertTitle>
            <AlertDescription>Please sign in again.</AlertDescription>
          </Alert>
          <Link to="/login">
            <Button variant="accent">Sign In</Button>
          </Link>
        </div>
      );
    }

    return (
      <QueryError
        error={error}
        fallbackMessage="Failed to load dashboard"
        onRetry={() => refetch()}
      />
    );
  }

  const tabs = [
    { value: 'submissions', label: 'Submissions', content: <SubmissionsTab /> },
    { value: 'analytics', label: 'Analytics', content: <AnalyticsTab /> },
    { value: 'voting-history', label: 'Voting History', content: <VotingHistoryTab /> },
    { value: 'settings', label: 'Settings', content: <SettingsTab /> },
  ];

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

        {/* Tabs */}
        <Tabs tabs={tabs} defaultValue="submissions" />

        {/* Curator Tools (admin only) */}
        {profile?.role === 'admin' && (
          <section className="mt-10">
            <h2 className="text-lg font-bold mb-5">Curator Tools</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/dashboard/curator"
                className="flex items-center gap-4 rounded-xl border border-hex-border bg-hex-card/50 p-5 hover:bg-hex-card transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10">
                  <ClipboardList className="h-5 w-5 text-accent-purple" />
                </div>
                <div>
                  <p className="font-semibold text-hex-text group-hover:text-accent-purple transition-colors">
                    Review Queue
                  </p>
                  <p className="text-sm text-hex-muted">Review pending submissions</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-hex-muted group-hover:text-accent-purple transition-colors" />
              </Link>
              <Link
                to="/dashboard/my-reviews"
                className="flex items-center gap-4 rounded-xl border border-hex-border bg-hex-card/50 p-5 hover:bg-hex-card transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/10">
                  <FileText className="h-5 w-5 text-accent-purple" />
                </div>
                <div>
                  <p className="font-semibold text-hex-text group-hover:text-accent-purple transition-colors">
                    My Reviews
                  </p>
                  <p className="text-sm text-hex-muted">View your review history</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-hex-muted group-hover:text-accent-purple transition-colors" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
