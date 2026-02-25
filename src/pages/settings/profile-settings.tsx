import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useUpdateProfile } from '@/hooks/use-profile';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { uploadAvatar } from '@/lib/image-upload';
import { profileSchema } from '@/lib/validators';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    </div>
  );
}
