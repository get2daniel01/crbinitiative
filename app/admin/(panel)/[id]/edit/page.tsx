import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import StoryForm from '@/components/StoryForm';

export default async function EditStory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: story } = await supabase
    .from('stories')
    .select('id, title, story_date, body, image_url, featured')
    .eq('id', id)
    .maybeSingle();
  if (!story) notFound();
  const { count } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('featured', true);

  return (
    <section>
      <div className="w">
        <h1 className="pt">Edit story</h1>
        <StoryForm initial={story} featuredCount={count ?? 0} />
      </div>
    </section>
  );
}
