import type { MetadataRoute } from 'next';
import { NAV, SITE } from '@/lib/site';
import { getAllStorySlugs } from '@/lib/stories';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [...NAV.map((n) => n.href), '/privacy'];
  const stories = await getAllStorySlugs();
  return [
    ...paths.map((p) => ({ url: `${SITE.url}${p === '/' ? '/' : p}` })),
    ...stories.map((s) => ({ url: `${SITE.url}/impact/${s.slug}`, lastModified: s.story_date })),
  ];
}
