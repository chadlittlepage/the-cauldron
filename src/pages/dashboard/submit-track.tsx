import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useCreateSubmission } from '@/hooks/use-submissions';
import { submissionSchema, detectPlatform } from '@/lib/validators';
import type { DetectedPlatform } from '@/lib/validators';
import { fetchTrackMetadata } from '@/lib/oembed';
import type { TrackMetadata } from '@/lib/oembed';
import { GENRES } from '@/lib/constants';
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
  Loader2,
} from 'lucide-react';

const STEPS = [
  { label: 'Link', icon: LinkIcon },
  { label: 'Track Info', icon: Music },
  { label: 'Details', icon: FileText },
];

const PLATFORM_LABELS: Record<string, string> = {
  spotify: 'Spotify',
  soundcloud: 'SoundCloud',
  bandcamp: 'Bandcamp',
  other: 'Other',
};

export function SubmitTrackPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createSubmission = useCreateSubmission();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    trackTitle: '',
    artistName: '',
    trackUrl: '',
    platform: '' as string,
    genre: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const submitting = useRef(false);

  const [detectedPlatform, setDetectedPlatform] = useState<DetectedPlatform>(null);
  const [metadata, setMetadata] = useState<TrackMetadata | null>(null);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);
  const [titlePrefilled, setTitlePrefilled] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const abortRef = useRef<AbortController | undefined>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (field === 'trackTitle' && titlePrefilled) {
      setTitlePrefilled(false);
    }
  }

  function handleUrlChange(url: string) {
    updateField('trackUrl', url);

    const platform = detectPlatform(url);
    setDetectedPlatform(platform);
    if (platform) {
      setForm((prev) => ({ ...prev, platform }));
    }

    clearTimeout(debounceRef.current);
    abortRef.current?.abort();
    setMetadata(null);

    if (!platform || platform === 'bandcamp' || platform === 'other') {
      setFetchingMetadata(false);
      return;
    }

    setFetchingMetadata(true);
    debounceRef.current = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;

      void fetchTrackMetadata(url, platform, controller.signal).then((result) => {
        if (controller.signal.aborted) return;
        setMetadata(result);
        setFetchingMetadata(false);
        if (result?.title) {
          setForm((prev) => ({
            ...prev,
            trackTitle: result.title,
            ...(result.artistName ? { artistName: result.artistName } : {}),
          }));
          setTitlePrefilled(true);
        }
      });
    }, 500);
  }

  function validateStep(): boolean {
    const fieldErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.trackUrl.trim()) fieldErrors.trackUrl = 'Track URL is required';
      else if (!detectedPlatform) fieldErrors.trackUrl = 'Please enter a valid track URL';
    } else if (step === 1) {
      if (!form.trackTitle.trim()) fieldErrors.trackTitle = 'Track title is required';
      if (!form.genre) fieldErrors.genre = 'Please select a genre';
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
        artist_name: form.artistName || null,
        track_url: form.trackUrl,
        platform: form.platform as 'spotify' | 'soundcloud' | 'bandcamp' | 'other',
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

          {/* Step 0: Link */}
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Track URL" htmlFor="trackUrl" error={errors.trackUrl}>
                <Input
                  id="trackUrl"
                  value={form.trackUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://open.spotify.com/track/..."
                  icon={<LinkIcon className="h-4 w-4" />}
                  suffix={
                    fetchingMetadata ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : detectedPlatform ? (
                      <span className="inline-flex items-center rounded-full bg-accent-purple/10 px-2 py-0.5 text-xs font-medium text-accent-purple">
                        {PLATFORM_LABELS[detectedPlatform] ?? detectedPlatform}
                      </span>
                    ) : null
                  }
                />
              </FormField>

              {metadata && (
                <div className="flex items-center gap-3 rounded-lg border border-hex-border bg-hex-surface/50 p-3 animate-fade-in">
                  {metadata.thumbnailUrl && (
                    <img
                      src={metadata.thumbnailUrl}
                      alt=""
                      className="h-12 w-12 rounded-md object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-hex-text truncate">{metadata.title}</p>
                    {metadata.artistName && (
                      <p className="text-xs text-hex-muted truncate">{metadata.artistName}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-lg bg-accent-purple/5 border border-accent-purple/10 p-3">
                <Info className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                <p className="text-xs text-hex-muted">
                  Paste a Spotify, SoundCloud, or Bandcamp track link. Right-click the track and
                  select &quot;Copy link&quot; or &quot;Share&quot;.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Track Info */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <FormField label="Track Title" htmlFor="trackTitle" error={errors.trackTitle}>
                <Input
                  id="trackTitle"
                  value={form.trackTitle}
                  onChange={(e) => updateField('trackTitle', e.target.value)}
                  placeholder="My Awesome Track"
                  icon={<Music className="h-4 w-4" />}
                />
                {titlePrefilled && detectedPlatform && (
                  <p className="mt-1 text-xs text-hex-muted">
                    Pre-filled from {PLATFORM_LABELS[detectedPlatform] ?? detectedPlatform}
                  </p>
                )}
              </FormField>
              <FormField label="Artist Name" htmlFor="artistName" error={errors.artistName}>
                <Input
                  id="artistName"
                  value={form.artistName}
                  onChange={(e) => updateField('artistName', e.target.value)}
                  placeholder="Artist or performer name"
                />
                {form.artistName && titlePrefilled && detectedPlatform && (
                  <p className="mt-1 text-xs text-hex-muted">
                    Pre-filled from {PLATFORM_LABELS[detectedPlatform] ?? detectedPlatform}
                  </p>
                )}
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
