'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/admin';
import { MAX_FEATURED, slugify } from '@/lib/stories';
import { STORY_BUCKET } from '@/lib/supabase/env';

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Enter your email and password.' };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: 'Email or password is incorrect.' };
  redirect('/admin');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

function refresh(slug?: string) {
  revalidatePath('/impact');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/impact/${slug}`);
  revalidatePath('/admin');
}

async function featuredCountExcluding(supabase: Awaited<ReturnType<typeof createClient>>, id?: string) {
  let q = supabase.from('stories').select('id', { count: 'exact', head: true }).eq('featured', true);
  if (id) q = q.neq('id', id);
  const { count } = await q;
  return count ?? 0;
}

export type SaveInput = {
  id?: string;
  title: string;
  story_date: string;
  body: string;
  image_url: string;
  featured: boolean;
};

export async function saveStory(input: SaveInput): Promise<{ error: string } | void> {
  const { supabase } = await requireAdmin();

  const title = input.title.trim();
  const body = input.body.trim();
  if (!title || !body || !/^\d{4}-\d{2}-\d{2}$/.test(input.story_date) || !input.image_url) {
    return { error: 'Add a title, date, picture and the full story.' };
  }

  if (input.featured && (await featuredCountExcluding(supabase, input.id)) >= MAX_FEATURED) {
    return { error: `Only ${MAX_FEATURED} stories can be shown on the Impact page. Remove one first.` };
  }

  let slug: string | undefined;
  if (input.id) {
    const { data, error } = await supabase
      .from('stories')
      .update({ title, body, story_date: input.story_date, image_url: input.image_url, featured: input.featured })
      .eq('id', input.id)
      .select('slug')
      .single();
    if (error) return { error: error.message };
    slug = data.slug;
  } else {
    slug = slugify(title);
    const { error } = await supabase
      .from('stories')
      .insert({ slug, title, body, story_date: input.story_date, image_url: input.image_url, featured: input.featured });
    if (error) return { error: error.message };
  }

  refresh(slug);
  redirect('/admin?saved=1');
}

export async function toggleFeatured(id: string, featured: boolean) {
  const { supabase } = await requireAdmin();
  if (featured && (await featuredCountExcluding(supabase, id)) >= MAX_FEATURED) {
    redirect('/admin?error=limit');
  }
  const { data, error } = await supabase.from('stories').update({ featured }).eq('id', id).select('slug').single();
  if (error) redirect('/admin?error=save');
  refresh(data.slug);
  redirect('/admin');
}

export async function deleteStory(id: string) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('stories').select('slug, image_url').eq('id', id).maybeSingle();
  const { error } = await supabase.from('stories').delete().eq('id', id);
  if (error) redirect('/admin?error=save');

  // Remove the picture from storage too (best effort).
  const marker = `/${STORY_BUCKET}/`;
  const idx = data?.image_url.indexOf(marker) ?? -1;
  if (data && idx >= 0) await supabase.storage.from(STORY_BUCKET).remove([data.image_url.slice(idx + marker.length)]);

  refresh(data?.slug);
  redirect('/admin');
}
