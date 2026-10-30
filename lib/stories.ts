import { createPublicClient } from '@/lib/supabase/public';

export const MAX_FEATURED = 6;

export type Story = {
  id: string;
  slug: string;
  title: string;
  story_date: string; // YYYY-MM-DD
  image_url: string;
  body: string;
  featured: boolean;
};

const COLUMNS = 'id, slug, title, story_date, image_url, body, featured';

export async function getFeaturedStories(): Promise<Story[]> {
  const db = createPublicClient();
  if (!db) return [];
  const { data, error } = await db
    .from('stories')
    .select(COLUMNS)
    .eq('featured', true)
    .order('story_date', { ascending: false })
    .limit(MAX_FEATURED);
  if (error) return [];
  return data ?? [];
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const db = createPublicClient();
  if (!db) return null;
  const { data } = await db.from('stories').select(COLUMNS).eq('slug', slug).maybeSingle();
  return data ?? null;
}

export async function getAllStorySlugs(): Promise<{ slug: string; story_date: string }[]> {
  const db = createPublicClient();
  if (!db) return [];
  const { data } = await db.from('stories').select('slug, story_date');
  return data ?? [];
}

export function formatStoryDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function excerpt(body: string, max = 150) {
  const flat = body.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return flat.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

export function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function slugify(title: string) {
  const base = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base || 'story'}-${suffix}`;
}
