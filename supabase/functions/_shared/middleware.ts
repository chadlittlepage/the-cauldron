import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// deno-lint-ignore no-explicit-any
type SupabaseClient = ReturnType<typeof createClient<any>>;

export type AuthResult =
  | { ok: true; user: { id: string }; supabase: SupabaseClient }
  | { ok: false; response: Response };

export type AdminResult = AuthResult;

/** Build CORS headers from APP_URL env var. */
export function corsHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': Deno.env.get('APP_URL') || 'https://hexwave.io',
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    ...extra,
  };
}

/** CORS preflight response. */
export function corsResponse(extra?: Record<string, string>): Response {
  return new Response(null, { headers: corsHeaders(extra) });
}

/** JSON response with CORS headers. */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

/** Verify the request has a valid auth token. Returns user + supabase client or error Response. */
export async function requireAuth(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return { ok: false, response: jsonResponse({ error: 'Missing auth token' }, 401) };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return { ok: false, response: jsonResponse({ error: 'Invalid auth token' }, 401) };
  }

  return { ok: true, user, supabase };
}

/** Verify the request has a valid auth token AND user is an admin. */
export async function requireAdmin(req: Request): Promise<AdminResult> {
  const auth = await requireAuth(req);
  if (!auth.ok) return auth;

  const { data: profile } = await auth.supabase
    .from('profiles')
    .select('role')
    .eq('id', auth.user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { ok: false, response: jsonResponse({ error: 'Admin only' }, 403) };
  }

  return auth;
}

/** Structured JSON log to console. */
export function log(level: 'info' | 'warn' | 'error', fn: string, message: string, extra?: Record<string, unknown>): void {
  const entry = { level, function: fn, message, timestamp: new Date().toISOString(), ...extra };
  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}
