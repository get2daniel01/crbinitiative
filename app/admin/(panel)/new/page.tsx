import { requireAdmin } from '@/lib/admin';
import StoryForm from '@/components/StoryForm';

export default async function NewStory() {
  const { supabase } = await requireAdmin();
  const { count } = await supabase.from('stories').select('id', { count: 'exact', head: true }).eq('featured', true);
  const today = new Date().toISOString().slice(0, 10);
  return (
    <section>
      <div className="w">
        <h1 className="pt">New story</h1>
        <StoryForm
          featuredCount={count ?? 0}
          initial={{ title: '', story_date: today, body: '', image_url: '', featured: false }}
        />
      </div>
    </section>
  );
}
