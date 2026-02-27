import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { captureException } from '../_shared/sentry.ts';
import { validateChartsBody } from '../_shared/validate.ts';
import { requireAdmin, corsResponse, jsonResponse, log } from '../_shared/middleware.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return corsResponse();

  let userId: string | undefined;
  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return auth.response;
    userId = auth.user.id;

    const parsed = validateChartsBody(await req.json());
    if (!parsed.ok) return jsonResponse({ error: parsed.error }, 400);
    const { type, period } = parsed.data;

    if (type === 'monthly' && period) {
      const { error } = await auth.supabase.rpc('generate_monthly_chart', { p_period: period });
      if (error) throw error;
    } else if (type === 'yearly' && period) {
      const { error } = await auth.supabase.rpc('generate_yearly_chart', { p_year: period });
      if (error) throw error;
    } else {
      const now = new Date();
      const monthPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const yearPeriod = String(now.getFullYear());

      const { error: monthError } = await auth.supabase.rpc('generate_monthly_chart', { p_period: monthPeriod });
      if (monthError) throw monthError;

      const { error: yearError } = await auth.supabase.rpc('generate_yearly_chart', { p_year: yearPeriod });
      if (yearError) throw yearError;
    }

    log('info', 'generate-charts', 'Charts generated', { type, period });
    return jsonResponse({ success: true });
  } catch (err) {
    log('error', 'generate-charts', (err as Error).message);
    await captureException(err, { function: 'generate-charts', userId });
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
