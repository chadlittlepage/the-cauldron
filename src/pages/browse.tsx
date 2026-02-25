import { useMemo, useState } from 'react';
import { useSubmissions } from '@/hooks/use-submissions';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { TrackCard } from '@/components/track/track-card';
import { GenreFilter } from '@/components/track/genre-filter';
import { Pagination } from '@/components/ui/pagination';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonCard } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Music, Search, Headphones, X } from 'lucide-react';

export function BrowsePage() {
  useDocumentTitle('Browse Tracks');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error, refetch } = useSubmissions({
    genre: genre || undefined,
    status: 'accepted',
    page,
    search: search || undefined,
  });

  const submissions = data?.data;
  const linkState = useMemo(
    () =>
      submissions
        ? { trackIds: submissions.map((d) => d.id), source: 'browse' as const }
        : undefined,
    [submissions],
  );

  return (
    <div className="relative">
      {/* Hero area */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple/10">
              <Headphones className="h-5 w-5 text-accent-purple" />
            </div>
            <h1 className="text-3xl font-bold">Browse Tracks</h1>
          </div>
          <p className="text-hex-muted max-w-xl">
            Discover community-curated music. Filter by genre and find your next favorite track.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
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

        <GenreFilter
          selected={genre}
          onChange={(g) => {
            setGenre(g);
            setPage(1);
          }}
          className="mb-8"
        />

        {isError ? (
          <QueryError
            error={error}
            fallbackMessage="Failed to load tracks"
            onRetry={() => refetch()}
          />
        ) : isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !data?.data?.length ? (
          <EmptyState
            icon={<Music className="h-10 w-10" />}
            title="No tracks found"
            description="Try selecting a different genre or check back later for new submissions."
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-hex-muted">
                <span className="font-semibold text-hex-text">{data.data.length}</span> tracks
                {genre && (
                  <>
                    {' '}
                    in <span className="text-accent-purple">{genre}</span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2 text-xs text-hex-muted">
                <Search className="h-3.5 w-3.5" />
                Page {page} of {data.totalPages}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.data.map((submission) => (
                <TrackCard
                  key={submission.id}
                  id={submission.id}
                  trackTitle={submission.track_title}
                  artistName={
                    (submission.profiles as { display_name: string } | null)?.display_name ??
                    'Unknown'
                  }
                  genre={submission.genre}
                  platform={submission.platform}
                  status={submission.status}
                  voteCount={submission.vote_count}
                  createdAt={submission.created_at}
                  linkState={linkState}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
              className="mt-10"
            />
          </>
        )}
      </div>
    </div>
  );
}
