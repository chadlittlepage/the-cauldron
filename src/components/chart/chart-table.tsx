import { Link } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartEntry {
  id: string;
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
          <TableRow key={entry.id}>
            <TableCell>
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                  entry.rank <= 3
                    ? rankColors[entry.rank - 1]
                    : 'text-hex-muted',
                )}
              >
                {entry.rank <= 3 ? <Trophy className="h-4 w-4" /> : entry.rank}
              </span>
            </TableCell>
            <TableCell>
              <Link
                to={`/track/${entry.id}`}
                className="font-semibold hover:text-accent-purple transition-colors"
              >
                {entry.submissions?.track_title ?? 'Unknown'}
              </Link>
            </TableCell>
            <TableCell className="text-hex-muted">
              {(entry.submissions?.profiles as { display_name: string } | null)?.display_name ??
                'Unknown'}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{entry.submissions?.genre ?? ''}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <ThumbsUp className="h-3.5 w-3.5 text-accent-purple" />
                {entry.vote_count}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
