import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCreateSubmission } from '@/hooks/use-submissions';
import { submissionSchema } from '@/lib/validators';
import { GENRES, PLATFORMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Music,
  Link as LinkIcon,
  FileText,
  ArrowRight,
  ArrowLeft,
  Check,
  Headphones,
  Info,
} from 'lucide-react';

const STEPS = [
  { label: 'Track Info', icon: Music },
  { label: 'Link', icon: LinkIcon },
  { label: 'Details', icon: FileText },
];

export function SubmitTrackPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createSubmission = useCreateSubmission();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    trackTitle: '',
    trackUrl: '',
    platform: 'spotify' as const,
    genre: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const submitting = useRef(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validateStep(): boolean {
    const fieldErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.trackTitle.trim()) fieldErrors.trackTitle = 'Track title is required';
      if (!form.genre) fieldErrors.genre = 'Please select a genre';
    } else if (step === 1) {
      if (!form.trackUrl.trim()) fieldErrors.trackUrl = 'Track URL is required';
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (submitting.current) return;
    submitting.current = true;
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
      submitting.current = false;
      return;
    }

    if (!user) {
      submitting.current = false;
      return;
    }

    try {
      await createSubmission.mutateAsync({
        artist_id: user.id,
        track_title: form.trackTitle,
        track_url: form.trackUrl,
        platform: form.platform,
        genre: form.genre,
        description: form.description || null,
        payment_id: null,
        paid_at: null,
      });
      navigate('/dashboard/submissions');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Failed to create submission');
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-xl bg-accent-purple/10 p-3 mb-4">
            <Headphones className="h-6 w-6 text-accent-purple" />
          </div>
          <h1 className="text-2xl font-bold">Submit Song Free</h1>
          <p className="mt-2 text-sm text-hex-muted">Share your music with the hexwave community</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10 max-w-sm mx-auto">
          <div className="flex items-center">
            {STEPS.map((s, idx) => (
              <div key={s.label} className="contents">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300',
                      idx < step
                        ? 'border-accent-purple bg-accent-purple text-white'
                        : idx === step
                          ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                          : 'border-hex-border text-hex-muted',
                    )}
                  >
                    {idx < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      idx <= step ? 'text-hex-text' : 'text-hex-muted',
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'h-px flex-1 mx-3 self-start mt-5',
                      idx < step ? 'bg-accent-purple' : 'bg-hex-border',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-8">
          {serverError && (
            <Alert variant="error" className="mb-6">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Step 0: Track Info */}
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Track Title" htmlFor="trackTitle" error={errors.trackTitle}>
                <Input
                  id="trackTitle"
                  value={form.trackTitle}
                  onChange={(e) => updateField('trackTitle', e.target.value)}
                  placeholder="My Awesome Track"
                  icon={<Music className="h-4 w-4" />}
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
            </div>
          )}

          {/* Step 1: Link */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
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
                  icon={<LinkIcon className="h-4 w-4" />}
                />
              </FormField>
              <div className="flex items-start gap-2 rounded-lg bg-accent-purple/5 border border-accent-purple/10 p-3">
                <Info className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                <p className="text-xs text-hex-muted">
                  Paste the full URL from {form.platform === 'spotify' ? 'Spotify' : form.platform}.
                  Right-click the track and select &quot;Copy link&quot; or &quot;Share&quot;.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <FormField
                label="Description (optional)"
                htmlFor="description"
                error={errors.description}
              >
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Tell us about your track, its inspiration, production details..."
                  rows={5}
                />
              </FormField>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <Button variant="ghost" onClick={prevStep} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <Button variant="accent" onClick={nextStep} className="gap-2 group">
                Continue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                variant="accent"
                onClick={() => void handleSubmit()}
                disabled={createSubmission.isPending}
                className="gap-2 group"
                size="lg"
              >
                {createSubmission.isPending ? 'Processing...' : 'Submit Track'}
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
