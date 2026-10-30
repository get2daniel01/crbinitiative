import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { formatStoryDate, MAX_FEATURED } from '@/lib/stories';
import { toggleFeatured } from '../actions';
import DeleteStoryButton from '@/components/DeleteStoryButton';

const errors: Record<string, string> = {
  limit: `Only ${MAX_FEATURED} stories can be shown on the Impact page. Remove one first, then select this one.`,
  save: 'That change could not be saved. Try again.',
};

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from('stories')
    .select('id, slug, title, story_date, featured')
    .order('story_date', { ascending: false });
  const stories = data ?? [];
  const featured = stories.filter((s) => s.featured).length;

  return (
    <section>
      <div className="w">
        <div className="adm-head">
          <h1 className="pt">Impact stories</h1>
          <Link className="btn" href="/admin/new">
            New story
          </Link>
        </div>

        <p className="adm-count">
          <b>{featured} of {MAX_FEATURED}</b> stories are shown on the Impact page.
        </p>
        {saved && <p className="adm-ok" role="status">Story saved.</p>}
        {error && errors[error] && <p className="adm-error" role="alert">{errors[error]}</p>}

        {stories.length === 0 ? (
          <div className="ph">
            <strong>No stories yet</strong>
            Select New story to post the first one.
          </div>
        ) : (
          <ul className="adm-list">
            {stories.map((s) => (
              <li key={s.id}>
                <div className="adm-meta">
                  <Link href={`/impact/${s.slug}`}>{s.title}</Link>
                  <small>{formatStoryDate(s.story_date)}</small>
                </div>
                <div className="adm-row-actions">
                  <form action={toggleFeatured.bind(null, s.id, !s.featured)}>
                    <button type="submit" className={`adm-pill${s.featured ? ' on' : ''}`} aria-pressed={s.featured}>
                      {s.featured ? 'On Impact page' : 'Not shown'}
                    </button>
                  </form>
                  <Link className="adm-link" href={`/admin/${s.id}/edit`}>
                    Edit
                  </Link>
                  <DeleteStoryButton id={s.id} title={s.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
