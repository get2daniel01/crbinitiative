import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';

/** Use at the top of every admin page and action. Redirects to login unless the user is an admin. */
export async function requireAdmin() {
  if (!supabaseConfigured) redirect('/admin/login?error=config');
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!data) redirect('/admin/login?error=not-admin');
  return { supabase, user };
}
