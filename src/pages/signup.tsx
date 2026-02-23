import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { signupSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

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
      await signUp(form.email, form.password, {
        display_name: form.displayName,
        role: form.role,
      });
      navigate('/auth/callback');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join hexwave as an artist or curator</CardDescription>
        </CardHeader>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <CardContent className="space-y-4">
            {serverError && (
              <Alert variant="error">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
            <FormField label="Display Name" htmlFor="displayName" error={errors.displayName}>
              <Input
                id="displayName"
                value={form.displayName}
                onChange={(e) => updateField('displayName', e.target.value)}
                placeholder="Your display name"
              />
            </FormField>
            <FormField label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
              />
            </FormField>
            <FormField label="Password" htmlFor="password" error={errors.password}>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="At least 8 characters"
              />
            </FormField>
            <FormField label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword}>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
              />
            </FormField>
            <FormField label="I am a..." htmlFor="role" error={errors.role}>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-hex-text cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="artist"
                    checked={form.role === 'artist'}
                    onChange={() => updateField('role', 'artist')}
                    className="accent-accent-purple"
                  />
                  Artist
                </label>
                <label className="flex items-center gap-2 text-sm text-hex-text cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="curator"
                    checked={form.role === 'curator'}
                    onChange={() => updateField('role', 'curator')}
                    className="accent-accent-purple"
                  />
                  Curator
                </label>
              </div>
            </FormField>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-sm text-hex-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-purple hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
