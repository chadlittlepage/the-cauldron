import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCreateSubmission } from '@/hooks/use-submissions';
import { submissionSchema } from '@/lib/validators';
import { GENRES, PLATFORMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function SubmitTrackPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createSubmission = useCreateSubmission();

  const [form, setForm] = useState({
    trackTitle: '',
    trackUrl: '',
    platform: 'spotify' as const,
    genre: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const result = submissionSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string') {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    if (!user) return;

    try {
      const submission = await createSubmission.mutateAsync({
        artist_id: user.id,
        track_title: form.trackTitle,
        track_url: form.trackUrl,
        platform: form.platform,
        genre: form.genre,
        description: form.description || null,
        payment_id: null,
        paid_at: null,
      });
      navigate(`/payment/checkout/${submission.id}`);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to create submission');
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Submit a Track</CardTitle>
          <CardDescription>Share your music with the hexwave community ($2 fee)</CardDescription>
        </CardHeader>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <CardContent className="space-y-4">
            {serverError && (
              <Alert variant="error">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
            <FormField label="Track Title" htmlFor="trackTitle" error={errors.trackTitle}>
              <Input
                id="trackTitle"
                value={form.trackTitle}
                onChange={(e) => updateField('trackTitle', e.target.value)}
                placeholder="My Awesome Track"
              />
            </FormField>
            <FormField label="Platform" htmlFor="platform" error={errors.platform}>
              <Select
                id="platform"
                value={form.platform}
                onChange={(e) => updateField('platform', e.target.value)}
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Track URL" htmlFor="trackUrl" error={errors.trackUrl}>
              <Input
                id="trackUrl"
                value={form.trackUrl}
                onChange={(e) => updateField('trackUrl', e.target.value)}
                placeholder="https://open.spotify.com/track/..."
              />
            </FormField>
            <FormField label="Genre" htmlFor="genre" error={errors.genre}>
              <Select
                id="genre"
                value={form.genre}
                onChange={(e) => updateField('genre', e.target.value)}
              >
                <option value="">Select a genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Description (optional)" htmlFor="description" error={errors.description}>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Tell us about your track..."
                rows={4}
              />
            </FormField>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={createSubmission.isPending}
            >
              {createSubmission.isPending ? 'Submitting...' : 'Continue to Payment ($2)'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
