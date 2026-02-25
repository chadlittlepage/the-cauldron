import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReviewQueue } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { GENRES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import { CheckCircle, ThumbsUp, Music, ArrowRight, ListTodo, Search, X } from 'lucide-react';

export function ReviewQueuePage() {
  useDocumentTitle('Review Queue');
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('');
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, error, refetch } = useReviewQueue({ page, genre, search });
  const queue = data?.data;

  function selectGenre(g: string) {
    setGenre(g === genre ? '' : g);
    setPage(1);
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[300px] h-[200px] rounded-full bg-accent-pink/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pink/10">
            <ListTodo className="h-5 w-5 text-accent-pink" />
          </div>
          <h1 className="text-2xl font-bold">Review Queue</h1>
        </div>
        <p className="text-hex-muted mb-6">Tracks waiting for your expert review</p>

        {/* Search */}
        <div className="mb-4 max-w-sm">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search tracks..."
            icon={<Search className="h-4 w-4" />}
            suffix={
              search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                  className="flex items-center text-hex-muted hover:text-hex-text transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Genre filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => selectGenre('')}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
              !genre
                ? 'bg-accent-purple text-white'
                : 'bg-hex-surface border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light',
            )}
          >
            All
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => selectGenre(g)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200',
                genre === g
                  ? 'bg-accent-purple text-white'
                  : 'bg-hex-surface border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light',
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {isError ? (
          <QueryError
            error={error}
            fallbackMessage="Failed to load review queue"
            onRetry={() => refetch()}
          />
        ) : isLoading ? (
          <SkeletonTable rows={5} />
        ) : !queue?.length ? (
          <EmptyState
            icon={<CheckCircle className="h-10 w-10" />}
            title="Queue is empty"
            description="No tracks waiting for review. Check back later for new submissions."
          />
        ) : (
          <div className="space-y-3">
            {queue.map((submission) => (
              <div
                key={submission.id}
                className="group glass-card rounded-xl p-5 flex items-center justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10">
                    <Music className="h-5 w-5 text-accent-purple" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate group-hover:text-accent-purple transition-colors">
                      {submission.track_title}
                    </h3>
                    <p className="text-sm text-hex-muted">
                      by{' '}
                      {(submission.profiles as { display_name: string } | null)?.display_name ??
                        'Unknown'}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline">{submission.genre}</Badge>
                      <Badge variant="outline">{submission.platform}</Badge>
                      <span className="flex items-center gap-1 text-xs text-hex-muted">
                        <ThumbsUp className="h-3 w-3" /> {submission.vote_count}
                      </span>
                    </div>
                  </div>
                </div>
                <Link to={`/dashboard/review/${submission.id}`}>
                  <Button variant="accent" size="sm" className="gap-2 group/btn shrink-0">
                    Review
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            ))}

            {data && data.totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
                className="mt-8"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
