import type { Metadata } from 'next';
import Link from 'next/link';
import StoryCard from '@/components/StoryCard';
import { getFeaturedStories } from '@/lib/stories';

export const revalidate = 60;

const description =
  'How Community Resilience Builders Initiative monitors results, listens to communities and reports on its work.';

export const metadata: Metadata = {
  title: 'Impact',
  description,
  alternates: { canonical: '/impact' },
  openGraph: { title: 'Impact', description, url: '/impact' },
};

export default async function Impact() {
  const stories = await getFeaturedStories();
  return (
    <>
      <section style={{ paddingBottom: stories.length ? 24 : undefined }}>
        <div className="w prose">
          <h1 className="pt">Impact</h1>
          <p style={{ fontSize: 18, margin: 0 }}>
            We measure what we do, listen to the people we serve and share what we learn.
          </p>
        </div>
      </section>
      {stories.length > 0 && (
        <section className="alt" style={{ paddingTop: 48, paddingBottom: 56 }}>
          <div className="w">
            <h2>Stories of impact</h2>
            <div className="story-grid">
              {stories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}
      <section>
        <div className="w prose">
        <h2>How we track results</h2>
        <p>
          Every program is planned with a clear objective, indicators and a baseline, so we can show what changed
          and for whom. We use a Monitoring, Evaluation, Accountability and Learning (MEAL) approach in all our
          work.
        </p>
        <div className="grid3" style={{ margin: '30px 0' }}>
          <div>
            <h3>Monitor</h3>
            <p>Regular data collection against agreed indicators.</p>
          </div>
          <div>
            <h3>Listen</h3>
            <p>Feedback and complaints channels open to every community member.</p>
          </div>
          <div>
            <h3>Learn and report</h3>
            <p>Reviews that change how we work, and reports to communities and donors.</p>
          </div>
        </div>
        <h2>Accountability to communities</h2>
        <p>
          People we serve can raise concerns, complaints or suggestions at any time, confidentially, by writing to{' '}
          <a href="mailto:info@crbinitiative.org">info@crbinitiative.org</a>. We respond to every message and use
          feedback to improve our programs.
        </p>
        <h2>Reports</h2>
        <p>
          Program results, annual reports and audited accounts are published on our{' '}
          <Link href="/transparency">Transparency</Link> page as they are completed.
        </p>
        </div>
      </section>
    </>
  );
}
