import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const sentryAuthToken = Deno.env.get('SENTRY_AUTH_TOKEN') ?? '';
const sentryOrg = 'cell-division';
const sentryProject = 'hexwave';

serve(async (req: Request) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || '*',
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'GET',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify caller is admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing auth token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid auth token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Admin only' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!sentryAuthToken) {
      return new Response(JSON.stringify({ error: 'Sentry not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Fetch 25 most recent unresolved issues from Sentry
    const sentryResp = await fetch(
      `https://sentry.io/api/0/projects/${sentryOrg}/${sentryProject}/issues/?query=is:unresolved&sort=date&limit=25`,
      {
        headers: {
          Authorization: `Bearer ${sentryAuthToken}`,
        },
      },
    );

    if (!sentryResp.ok) {
      const text = await sentryResp.text();
      return new Response(JSON.stringify({ error: `Sentry API error: ${sentryResp.status}`, detail: text }), {
        status: sentryResp.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const issues = await sentryResp.json();

    // Return simplified issue data
    const simplified = (issues as Array<Record<string, unknown>>).map((issue) => ({
      id: issue.id,
      title: issue.title,
      culprit: issue.culprit,
      count: issue.count,
      firstSeen: issue.firstSeen,
      lastSeen: issue.lastSeen,
      level: issue.level,
      permalink: issue.permalink,
    }));

    return new Response(JSON.stringify(simplified), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    await captureException(err, { function: 'sentry-proxy' });
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
