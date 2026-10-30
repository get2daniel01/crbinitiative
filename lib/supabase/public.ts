import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY, supabaseConfigured } from './env';

/** Read-only anonymous client for public pages (no cookies, so pages can be cached). */
export function createPublicClient() {
  if (!supabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
}
