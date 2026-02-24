import { Link } from 'react-router-dom';
import { useCurators } from '@/hooks/use-profile';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonCard } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Users, Star, ExternalLink } from 'lucide-react';

export function CuratorsPage() {
  useDocumentTitle('Curators');
  const { data: curators, isLoading, isError, error, refetch } = useCurators();

  return (
    <div className="relative">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[400px] h-[300px] rounded-full bg-accent-pink/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-pink/10">
              <Users className="h-5 w-5 text-accent-pink" />
            </div>
            <h1 className="text-3xl font-bold">Curators</h1>
          </div>
          <p className="text-hex-muted max-w-xl">
            Meet the expert listeners who review every submission. Each curator has 1,000+ followers.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {isError ? (
          <QueryError error={error} fallbackMessage="Failed to load curators" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !curators?.length ? (
          <EmptyState
            icon={<Users className="h-10 w-10" />}
            title="No curators yet"
            description="Curators will appear here once they join the platform."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curators.map((curator) => (
              <Link
                key={curator.id}
                to={`/curator/${curator.id}`}
                className="group glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/5"
              >
                <div className="flex items-start gap-4">
                  <Avatar
                    src={curator.avatar_url}
                    alt={curator.display_name}
                    fallback={curator.display_name.slice(0, 2)}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-hex-text group-hover:text-accent-purple transition-colors">
                      {curator.display_name}
                    </h3>
                    {curator.bio && (
                      <p className="mt-1 text-sm text-hex-muted line-clamp-2">{curator.bio}</p>
                    )}
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="outline" className="gap-1">
                        <Star className="h-3 w-3" />
                        {curator.listener_count.toLocaleString()} listeners
                      </Badge>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-hex-muted opacity-60 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
