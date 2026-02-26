import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useUpdateProfile } from '@/hooks/use-profile';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { uploadAvatar } from '@/lib/image-upload';
import { profileSchema } from '@/lib/validators';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

const GENRE_OPTIONS = [
  'Alternative',
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Folk',
  'Funk',
  'Hip Hop',
  'Indie',
  'Jazz',
  'Latin',
  'Metal',
  'Pop',
  'Punk',
  'R&B',
  'Reggae',
  'Rock',
  'Soul',
  'World',
];

const AVATAR_SEEDS = [
  'Melody',
  'Rhythm',
  'Harmony',
  'Bass',
  'Treble',
  'Synth',
  'Vinyl',
  'Echo',
  'Tempo',
  'Groove',
  'Reverb',
  'Chorus',
  'Acoustic',
  'Amp',
  'Aria',
  'Ballad',
  'Banjo',
  'Beat',
  'Blues',
  'Bongo',
  'Brass',
  'Bridge',
  'Cadence',
  'Cello',
  'Chord',
  'Clef',
  'Coda',
  'Cymbal',
  'Disco',
  'Drum',
  'Dubstep',
  'Dulcimer',
  'Encore',
  'Ensemble',
  'Fade',
  'Fiddle',
  'Flute',
  'Folk',
  'Forte',
  'Funk',
  'Fuzz',
  'Gig',
  'Glissando',
  'Gospel',
  'Grunge',
  'Guitar',
  'Harp',
  'Hook',
  'Horn',
  'Hymn',
  'Jazz',
  'Jingle',
  'Key',
  'Kick',
  'Lick',
  'Loop',
  'Lullaby',
  'Lyric',
  'Mandolin',
  'March',
  'Measure',
  'Mic',
  'Mixdown',
  'Moog',
  'Mute',
  'Note',
  'Octave',
  'Opera',
  'Orchestra',
  'Organ',
  'Overdrive',
  'Pedal',
  'Piano',
  'Piccolo',
  'Pitch',
  'Polka',
  'Pop',
  'Prelude',
  'Punk',
  'Quartet',
  'Raga',
  'Rap',
  'Reel',
  'Reggae',
  'Remix',
  'Riff',
  'Rock',
  'Rumba',
  'Salsa',
  'Samba',
  'Scale',
  'Serenade',
  'Ska',
  'Snare',
  'Solo',
  'Sonata',
  'Soul',
  'Speaker',
  'Staccato',
  'Stage',
  'Steel',
  'Strings',
  'Strum',
  'Sub',
  'Suite',
  'Sway',
  'Tabla',
  'Tango',
  'Tenor',
  'Tone',
  'Track',
  'Tremolo',
  'Trill',
  'Trio',
  'Trombone',
  'Trumpet',
  'Tuba',
  'Tune',
  'Ukulele',
  'Valve',
  'Vibe',
  'Viola',
  'Violin',
  'Vocal',
  'Volume',
  'Waltz',
  'Wah',
  'Wave',
  'Whistle',
  'Woodwind',
  'Xylophone',
  'Zither',
];

export function ProfileSettingsPage() {
  useDocumentTitle('Profile Settings');
  const { user, profile, refreshProfile } = useAuth();
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState({
    displayName: profile?.display_name ?? '',
    bio: profile?.bio ?? '',
    avatarUrl: profile?.avatar_url ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.avatarUrl;
      return next;
    });

    try {
      const url = await uploadAvatar(file, user.id);
      setForm((prev) => ({ ...prev, avatarUrl: url }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        avatarUrl: err instanceof Error ? err.message : 'Upload failed',
      }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const result = profileSchema.safeParse(form);
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
      await updateProfile.mutateAsync({
        userId: user.id,
        updates: {
          display_name: form.displayName,
          bio: form.bio || null,
          avatar_url: form.avatarUrl || null,
        },
      });
      await refreshProfile();
      setSuccess(true);
    } catch (err) {
      setErrors({ _server: err instanceof Error ? err.message : 'Update failed' });
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <CardContent className="space-y-4">
            {errors._server && (
              <Alert variant="error">
                <AlertDescription>{errors._server}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="success">
                <AlertDescription>Profile updated successfully.</AlertDescription>
              </Alert>
            )}
            <FormField label="Display Name" htmlFor="displayName" error={errors.displayName}>
              <Input
                id="displayName"
                value={form.displayName}
                onChange={(e) => updateField('displayName', e.target.value)}
              />
            </FormField>
            <FormField label="Bio" htmlFor="bio" error={errors.bio}>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </FormField>
            <FormField label="Avatar" htmlFor="avatarUpload" error={errors.avatarUrl}>
              <div className="flex items-center gap-4">
                <Avatar
                  src={form.avatarUrl || null}
                  alt={form.displayName || 'Avatar'}
                  fallback={form.displayName || '?'}
                  size="lg"
                />
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => void handleAvatarUpload(e)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                  <p className="text-xs text-hex-muted">Max 5 MB. Resized to 512px.</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-medium text-hex-muted hover:text-hex-fg transition-colors"
                  onClick={() => setAvatarPickerOpen((prev) => !prev)}
                >
                  <svg
                    className={`h-4 w-4 transition-transform ${avatarPickerOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Or choose an avatar
                </button>
                {avatarPickerOpen && (
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-hex-border p-3">
                    <div className="grid grid-cols-6 gap-3">
                      {AVATAR_SEEDS.map((seed) => {
                        const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                        const isSelected = form.avatarUrl === url;
                        return (
                          <button
                            key={seed}
                            type="button"
                            title={seed}
                            className={`rounded-full overflow-hidden transition-all ${isSelected ? 'ring-2 ring-[#4a556c] ring-offset-2 ring-offset-hex-bg' : 'hover:ring-2 hover:ring-hex-muted/50 hover:ring-offset-2 hover:ring-offset-hex-bg'}`}
                            onClick={() => updateField('avatarUrl', url)}
                          >
                            <img
                              src={url}
                              alt={seed}
                              className="h-12 w-12 rounded-full bg-hex-card"
                              loading="lazy"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </FormField>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {profile?.role === 'curator' && (
        <CuratorProfileCard userId={user?.id} profile={profile} onSaved={refreshProfile} />
      )}
    </div>
  );
}

function CuratorProfileCard({
  userId,
  profile,
  onSaved,
}: {
  userId: string | undefined;
  profile: {
    genres: string[];
    accepting_submissions: boolean;
    looking_for: string | null;
    website_url: string | null;
    instagram_handle: string | null;
    tiktok_handle: string | null;
    contact_email: string | null;
  };
  onSaved: () => Promise<void>;
}) {
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState({
    genres: profile.genres ?? [],
    acceptingSubmissions: profile.accepting_submissions ?? true,
    lookingFor: profile.looking_for ?? '',
    websiteUrl: profile.website_url ?? '',
    instagramHandle: profile.instagram_handle ?? '',
    tiktokHandle: profile.tiktok_handle ?? '',
    contactEmail: profile.contact_email ?? '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function toggleGenre(genre: string) {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!userId) return;

    try {
      await updateProfile.mutateAsync({
        userId,
        updates: {
          genres: form.genres,
          accepting_submissions: form.acceptingSubmissions,
          looking_for: form.lookingFor || null,
          website_url: form.websiteUrl || null,
          instagram_handle: form.instagramHandle || null,
          tiktok_handle: form.tiktokHandle || null,
          contact_email: form.contactEmail || null,
        },
      });
      await onSaved();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Curator Profile</CardTitle>
      </CardHeader>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertDescription>Curator profile updated.</AlertDescription>
            </Alert>
          )}

          {/* Accepting Submissions Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Accepting Submissions</p>
              <p className="text-xs text-hex-muted">
                Show artists you&apos;re open to new submissions
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.acceptingSubmissions}
              onClick={() =>
                setForm((prev) => ({ ...prev, acceptingSubmissions: !prev.acceptingSubmissions }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${form.acceptingSubmissions ? 'bg-accent-purple' : 'bg-hex-border'}`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${form.acceptingSubmissions ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>

          {/* Genres */}
          <div>
            <p className="text-sm font-medium mb-2">Genres</p>
            <p className="text-xs text-hex-muted mb-3">Select genres you specialize in</p>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => {
                const selected = form.genres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className="transition-all"
                  >
                    <Badge variant={selected ? 'accent' : 'outline'} className="cursor-pointer">
                      {genre}
                      {selected && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What I'm Looking For */}
          <FormField label="What I'm Looking For" htmlFor="lookingFor">
            <Textarea
              id="lookingFor"
              value={form.lookingFor}
              onChange={(e) => setForm((prev) => ({ ...prev, lookingFor: e.target.value }))}
              rows={3}
              placeholder="Describe the type of music you want to review..."
            />
          </FormField>

          {/* Social Links */}
          <div className="space-y-4">
            <p className="text-sm font-medium">Connect</p>
            <FormField label="Website" htmlFor="websiteUrl">
              <Input
                id="websiteUrl"
                value={form.websiteUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://yoursite.com"
              />
            </FormField>
            <FormField label="Instagram" htmlFor="instagramHandle">
              <Input
                id="instagramHandle"
                value={form.instagramHandle}
                onChange={(e) => setForm((prev) => ({ ...prev, instagramHandle: e.target.value }))}
                placeholder="@yourhandle"
              />
            </FormField>
            <FormField label="TikTok" htmlFor="tiktokHandle">
              <Input
                id="tiktokHandle"
                value={form.tiktokHandle}
                onChange={(e) => setForm((prev) => ({ ...prev, tiktokHandle: e.target.value }))}
                placeholder="@yourhandle"
              />
            </FormField>
            <FormField label="Contact Email" htmlFor="contactEmail">
              <Input
                id="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="public@email.com"
              />
            </FormField>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Saving...' : 'Save Curator Profile'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
