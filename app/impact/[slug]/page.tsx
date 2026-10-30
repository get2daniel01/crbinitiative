import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { excerpt, formatStoryDate, getStoryBySlug, paragraphs } from '@/lib/stories';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: 'Story not found' };
  const description = excerpt(story.body, 160);
  return {
    title: story.title,
    description,
    alternates: { canonical: `/impact/${story.slug}` },
    openGraph: {
      type: 'article',
      title: story.title,
      description,
      url: `/impact/${story.slug}`,
      images: [story.image_url],
      publishedTime: story.story_date,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article>
      <section style={{ paddingBottom: 24 }}>
        <div className="w story-head">
          <p style={{ margin: '0 0 14px' }}>
            <Link href="/impact">Back to Impact</Link>
          </p>
          <time dateTime={story.story_date} className="story-date">
            {formatStoryDate(story.story_date)}
          </time>
          <h1 className="pt">{story.title}</h1>
        </div>
      </section>
      <div className="w story-head">
        <div className="story-hero">
          <Image src={story.image_url} alt="" fill priority sizes="(max-width:800px) 100vw, 760px" />
        </div>
      </div>
      <section style={{ paddingTop: 36 }}>
        <div className="w prose story-text">
          {paragraphs(story.body).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </article>
  );
}
