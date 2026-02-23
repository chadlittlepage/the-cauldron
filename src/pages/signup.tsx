import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { signupSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';
import { Mail, Lock, User, Eye, EyeOff, Headphones, ArrowRight, Music, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURATOR_MIN_LISTENERS } from '@/lib/constants';

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'artist' as 'artist' | 'curator',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const result = signupSchema.safeParse(form);
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

    setLoading(true);
    try {
      // All new signups start as artist — curator requires verification
      const { data } = await signUp(form.email, form.password, {
        display_name: form.displayName,
        role: 'artist',
      });
      // If session exists, email confirmation is disabled — go straight in
      if (data?.session) {
        navigate('/auth/callback');
      } else {
        // Email confirmation is enabled — show the confirmation screen
        setEmailSent(true);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-12">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Email confirmation screen */}
        {emailSent ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Check your email</h1>
            <p className="text-hex-muted leading-relaxed mb-2">
              We sent a confirmation link to
            </p>
            <p className="font-semibold text-accent-purple mb-6">{form.email}</p>
            <div className="glass-card rounded-2xl p-6 text-left space-y-3 mb-8">
              <p className="text-sm text-hex-muted">
                Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/login">
                <Button variant="accent" className="w-full">
                  Go to Sign In
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="text-sm text-hex-muted hover:text-hex-text transition-colors"
              >
                Didn&apos;t receive it? Try again
              </button>
            </div>
          </div>
        ) : (
        <>
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-accent-purple/20">
              <Headphones className="h-5 w-5 text-white" />
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-hex-muted">
            Join hexwave as an artist or curator
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {serverError && (
              <Alert variant="error">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('role', 'artist')}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                  form.role === 'artist'
                    ? 'border-accent-purple bg-accent-purple/10 text-accent-purple'
                    : 'border-hex-border text-hex-muted hover:border-hex-border-light hover:text-hex-text',
                )}
              >
                <Music className="h-4 w-4" />
                Artist
              </button>
              <button
                type="button"
                onClick={() => updateField('role', 'curator')}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
                  form.role === 'curator'
                    ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                    : 'border-hex-border text-hex-muted hover:border-hex-border-light hover:text-hex-text',
                )}
              >
                <Users className="h-4 w-4" />
                Curator
              </button>
            </div>

            {form.role === 'curator' && (
              <Alert>
                <AlertDescription>
                  Curator accounts require verification of {CURATOR_MIN_LISTENERS.toLocaleString()}+ listeners.
                  You'll start as an artist and can apply for curator status once verified.
                </AlertDescription>
              </Alert>
            )}

            <FormField label="Display Name" htmlFor="displayName" error={errors.displayName}>
              <Input
                id="displayName"
                autoComplete="name"
                value={form.displayName}
                onChange={(e) => updateField('displayName', e.target.value)}
                placeholder="Your display name"
                icon={<User className="h-4 w-4" />}
              />
            </FormField>

            <FormField label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
              />
            </FormField>

            <FormField label="Password" htmlFor="password" error={errors.password}>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="At least 8 characters"
                icon={<Lock className="h-4 w-4" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-hex-text transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            </FormField>

            <FormField
              label="Confirm Password"
              htmlFor="confirmPassword"
              error={errors.confirmPassword}
            >
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                icon={<Lock className="h-4 w-4" />}
              />
            </FormField>

            <Button
              type="submit"
              variant="accent"
              className="w-full group"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-hex-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-accent-purple hover:text-accent-purple/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
        </>
        )}
      </div>
    </div>
  );
}
