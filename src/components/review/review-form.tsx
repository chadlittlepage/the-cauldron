import { useState } from 'react';
import { reviewSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { StarRating } from '@/components/ui/star-rating';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReviewFormProps {
  onSubmit: (rating: number, feedback: string) => Promise<void>;
  loading: boolean;
}

export function ReviewForm({ onSubmit, loading }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse({ rating, feedback });
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

    await onSubmit(rating, feedback);
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-hex-text">Rating</label>
        <StarRating value={rating} onChange={setRating} size="lg" className="mt-2" />
        {errors.rating && <p className="mt-1 text-sm text-error">{errors.rating}</p>}
      </div>
      <FormField label="Feedback" htmlFor="feedback" error={errors.feedback}>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
          placeholder="Share your detailed thoughts on this track (at least 20 characters)..."
        />
      </FormField>
      {errors._server && (
        <Alert variant="error">
          <AlertDescription>{errors._server}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
