import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartEntry {
  id: string;
  submission_id: string;
  rank: number;
  vote_count: number;
  submissions: {
    track_title: string;
    genre: string;
    profiles: { display_name: string } | null;
  } | null;
}

interface ChartTableProps {
  entries: ChartEntry[];
  className?: string;
}

const rankColors = [
  'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400',
  'bg-gradient-to-r from-gray-400/20 to-gray-500/10 text-gray-300',
  'bg-gradient-to-r from-orange-600/20 to-orange-700/10 text-orange-400',
];

export function ChartTable({ entries, className }: ChartTableProps) {
  const navigate = useNavigate();
  const trackIds = useMemo(() => entries.map((e) => e.submission_id), [entries]);

  const handleRowClick = useCallback(
    (submissionId: string) => {
      navigate(`/track/${submissionId}`, { state: { trackIds, source: 'charts' } });
    },
    [navigate, trackIds],
  );

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">#</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead className="text-right">Votes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow
            key={entry.id}
            tabIndex={0}
            onClick={() => handleRowClick(entry.submission_id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRowClick(entry.submission_id);
              }
            }}
            aria-label={`View ${entry.submissions?.track_title ?? 'track'}`}
            className="cursor-pointer hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-hex-dark"
          >
            <TableCell>
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                  entry.rank >= 1 && entry.rank <= 3
                    ? rankColors[entry.rank - 1]
                    : 'text-hex-muted',
                )}
              >
                {entry.rank >= 1 && entry.rank <= 3 ? (
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                ) : (
                  entry.rank
                )}
              </span>
            </TableCell>
            <TableCell className="font-semibold">
              {entry.submissions?.track_title ?? 'Unknown'}
            </TableCell>
            <TableCell className="text-hex-muted">
              {entry.submissions?.profiles?.display_name ?? 'Unknown'}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{entry.submissions?.genre ?? ''}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <ThumbsUp className="h-3.5 w-3.5 text-accent-purple" aria-hidden="true" />
                {entry.vote_count}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
