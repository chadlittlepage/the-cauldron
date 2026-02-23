import { Link } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
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
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                  entry.rank <= 3
                    ? 'bg-accent-orange/20 text-accent-orange'
                    : 'text-hex-muted',
                )}
              >
                {entry.rank <= 3 ? <Trophy className="h-4 w-4" /> : entry.rank}
              </span>
            </TableCell>
            <TableCell>
              <Link to={`/track/${entry.id}`} className="font-medium hover:text-accent-purple transition-colors">
                {entry.submissions?.track_title ?? 'Unknown'}
              </Link>
            </TableCell>
            <TableCell className="text-hex-muted">
              {(entry.submissions?.profiles as { display_name: string } | null)?.display_name ?? 'Unknown'}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{entry.submissions?.genre ?? ''}</Badge>
            </TableCell>
            <TableCell className="text-right font-semibold">{entry.vote_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
