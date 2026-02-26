import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCurators } from '@/hooks/use-profile';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QueryError } from '@/components/ui/query-error';
import { SkeletonCard } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Users, Star, ExternalLink, Search, X } from 'lucide-react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function CuratorsPage() {
  useDocumentTitle('Curators');
  const { user } = useAuth();
  const { data: curators, isLoading, isError, error, refetch } = useCurators();
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const { currentCurator, otherCurators, allOthersCount, availableLetters } = useMemo(() => {
    if (!curators)
      return {
        currentCurator: undefined,
        otherCurators: undefined,
        allOthersCount: 0,
        availableLetters: new Set<string>(),
      };
    const current = curators.find((c) => c.id === user?.id);
    const allOthers = curators
      .filter((c) => c.id !== user?.id)
      .sort((a, b) => a.display_name.localeCompare(b.display_name));

    const available = new Set<string>(allOthers.map((c) => c.display_name.charAt(0).toUpperCase()));

    let filtered = allOthers;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((c) => c.display_name.toLowerCase().includes(q));
    }
    if (activeLetter) {
      filtered = filtered.filter((c) => c.display_name.charAt(0).toUpperCase() === activeLetter);
    }

    return {
      currentCurator: current,
      otherCurators: filtered,
      allOthersCount: allOthers.length,
      availableLetters: available,
    };
  }, [curators, user?.id, search, activeLetter]);

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
            Meet the expert listeners who review every submission. Each curator has 1,000+
            followers.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {isError ? (
          <QueryError
            error={error}
            fallbackMessage="Failed to load curators"
            onRetry={() => refetch()}
          />
        ) : isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !allOthersCount && !currentCurator ? (
          <EmptyState
            icon={<Users className="h-10 w-10" />}
            title="No curators yet"
            description="Curators will appear here once they join the platform."
          />
        ) : (
          <div className="space-y-8">
            {currentCurator && (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-hex-text">Your Profile</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    to={`/curator/${currentCurator.id}`}
                    className="group glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/5 ring-1 ring-[#4a556c]/30"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={currentCurator.avatar_url}
                        alt={currentCurator.display_name}
                        fallback={currentCurator.display_name.slice(0, 2)}
                        size="lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-hex-text group-hover:text-accent-purple transition-colors">
                          {currentCurator.display_name}
                        </h3>
                        {currentCurator.bio && (
                          <p className="mt-1 text-sm text-hex-muted line-clamp-2">
                            {currentCurator.bio}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline" className="gap-1">
                            <Star className="h-3 w-3" />
                            {currentCurator.listener_count.toLocaleString()} listeners
                          </Badge>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-hex-muted opacity-60 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                    </div>
                  </Link>
                </div>
              </div>
            )}
            <div>
              {currentCurator && (
                <h2 className="mb-4 text-lg font-semibold text-hex-text">All Curators</h2>
              )}

              {/* Search */}
              <div className="mb-4 max-w-sm">
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveLetter('');
                  }}
                  placeholder="Search curators..."
                  icon={<Search className="h-4 w-4" />}
                  suffix={
                    search ? (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="flex items-center text-hex-muted hover:text-hex-text transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : undefined
                  }
                />
              </div>

              {/* A-Z letter bar */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLetter('');
                    setSearch('');
                  }}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                    !activeLetter
                      ? 'bg-accent-purple text-white'
                      : 'bg-hex-surface border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light',
                  )}
                >
                  All
                </button>
                {LETTERS.map((letter) => {
                  const hasResults = availableLetters.has(letter);
                  return (
                    <button
                      key={letter}
                      type="button"
                      disabled={!hasResults}
                      onClick={() => {
                        setActiveLetter(letter);
                        setSearch('');
                      }}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
                        activeLetter === letter
                          ? 'bg-accent-purple text-white'
                          : hasResults
                            ? 'bg-hex-surface border border-hex-border text-hex-muted hover:text-hex-text hover:border-hex-border-light'
                            : 'bg-hex-surface border border-hex-border text-hex-muted/30 cursor-not-allowed',
                      )}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {otherCurators && otherCurators.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {otherCurators.map((curator) => (
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
                            <p className="mt-1 text-sm text-hex-muted line-clamp-2">
                              {curator.bio}
                            </p>
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
              ) : (
                <EmptyState
                  icon={<Users className="h-10 w-10" />}
                  title="No curators found"
                  description="Try a different search or letter."
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearch('');
                        setActiveLetter('');
                      }}
                    >
                      Clear filters
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
