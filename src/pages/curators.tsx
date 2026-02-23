import { Link } from 'react-router-dom';
import { useCurators } from '@/hooks/use-profile';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Users, Star, ExternalLink } from 'lucide-react';

export function CuratorsPage() {
  const { data: curators, isLoading, isError, error } = useCurators();

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
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Alert variant="error" className="max-w-md">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error instanceof Error ? error.message : 'Failed to load curators'}</AlertDescription>
            </Alert>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-hex-muted">Loading curators...</p>
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
                  <ExternalLink className="h-4 w-4 text-hex-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
