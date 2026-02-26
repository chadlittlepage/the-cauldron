import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useArtistSubmissions } from '@/hooks/use-submissions';
import { SubmissionList } from '@/components/dashboard/submission-list';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Music, Search, Plus } from 'lucide-react';
import type { SubmissionStatus } from '@/types/database';

export function SubmissionsTab() {
  const { user } = useAuth();
  const { data: submissions } = useArtistSubmissions(user?.id);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (!submissions) return [];
    return submissions.filter((s) => {
      const matchesSearch =
        !search ||
        s.track_title.toLowerCase().includes(search.toLowerCase()) ||
        s.genre.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || s.status === (statusFilter as SubmissionStatus);
      return matchesSearch && matchesStatus;
    });
  }, [submissions, search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search submissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <SubmissionList submissions={filtered} />
      ) : (
        <EmptyState
          icon={<Music className="h-10 w-10" />}
          title={submissions?.length ? 'No matching submissions' : 'No submissions yet'}
          description={
            submissions?.length
              ? 'Try adjusting your search or filter.'
              : 'Submit your first track to get started on hexwave.'
          }
          action={
            !submissions?.length ? (
              <Link to="/dashboard/submit">
                <Button variant="accent" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Submit Song Free
                </Button>
              </Link>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
