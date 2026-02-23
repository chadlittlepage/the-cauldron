import { Link } from 'react-router-dom';
import { useCurators } from '@/hooks/use-profile';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { Users } from 'lucide-react';

export function CuratorsPage() {
  const { data: curators, isLoading } = useCurators();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Curators</h1>
      <p className="mt-2 text-hex-muted">Meet the experts who review submissions</p>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : !curators?.length ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No curators yet"
          description="Curators will appear here once they join the platform."
        />
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curators.map((curator) => (
            <Link
              key={curator.id}
              to={`/curator/${curator.id}`}
              className="flex items-center gap-4 rounded-lg border border-hex-border bg-hex-card p-5 transition-colors hover:border-primary"
            >
              <Avatar
                src={curator.avatar_url}
                alt={curator.display_name}
                fallback={curator.display_name.slice(0, 2)}
                size="lg"
              />
              <div>
                <h3 className="font-semibold">{curator.display_name}</h3>
                {curator.bio && (
                  <p className="mt-1 text-sm text-hex-muted line-clamp-2">{curator.bio}</p>
                )}
                <Badge variant="outline" className="mt-2">
                  {curator.listener_count.toLocaleString()} listeners
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
