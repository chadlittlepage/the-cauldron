import { useState } from 'react';
import { useSubmissions } from '@/hooks/use-submissions';
import { TrackCard } from '@/components/track/track-card';
import { GenreFilter } from '@/components/track/genre-filter';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Music } from 'lucide-react';

export function BrowsePage() {
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSubmissions({
    genre: genre || undefined,
    status: 'accepted',
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Browse Tracks</h1>
      <p className="mt-2 text-hex-muted">Discover music curated by the community</p>

      <GenreFilter selected={genre} onChange={(g) => { setGenre(g); setPage(1); }} className="mt-6" />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : !data?.data?.length ? (
        <EmptyState
          icon={<Music className="h-12 w-12" />}
          title="No tracks found"
          description="Try selecting a different genre or check back later."
        />
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((submission) => (
              <TrackCard
                key={submission.id}
                id={submission.id}
                trackTitle={submission.track_title}
                artistName={
                  (submission.profiles as { display_name: string } | null)?.display_name ?? 'Unknown'
                }
                genre={submission.genre}
                platform={submission.platform}
                status={submission.status}
                voteCount={submission.vote_count}
                createdAt={submission.created_at}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
}
