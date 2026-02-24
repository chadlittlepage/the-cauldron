import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || '*',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing auth token' }), { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid auth token' }), { status: 401 });
    }

    // Verify admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin only' }), { status: 403 });
    }

    const { type, period } = await req.json();

    if (type === 'monthly' && period) {
      const { error } = await supabase.rpc('generate_monthly_chart', { p_period: period });
      if (error) throw error;
    } else if (type === 'yearly' && period) {
      const { error } = await supabase.rpc('generate_yearly_chart', { p_year: period });
      if (error) throw error;
    } else {
      // Auto-generate: current month + current year
      const now = new Date();
      const monthPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const yearPeriod = String(now.getFullYear());

      const { error: monthError } = await supabase.rpc('generate_monthly_chart', { p_period: monthPeriod });
      if (monthError) throw monthError;

      const { error: yearError } = await supabase.rpc('generate_yearly_chart', { p_year: yearPeriod });
      if (yearError) throw yearError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || '*' },
    });
  } catch (err) {
    await captureException(err, { function: 'generate-charts' });
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || '*' },
    });
  }
});
