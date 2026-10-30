import Image from 'next/image';
import Link from 'next/link';
import { excerpt, formatStoryDate, type Story } from '@/lib/stories';

export default function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card">
      <Link href={`/impact/${story.slug}`} className="story-img" tabIndex={-1} aria-hidden="true">
        <Image src={story.image_url} alt="" fill sizes="(max-width:600px) 100vw, (max-width:980px) 50vw, 340px" />
      </Link>
      <div className="story-body">
        <time dateTime={story.story_date}>{formatStoryDate(story.story_date)}</time>
        <h3>
          <Link href={`/impact/${story.slug}`}>{story.title}</Link>
        </h3>
        <p>{excerpt(story.body)}</p>
        <Link className="story-more" href={`/impact/${story.slug}`} aria-label={`Read more: ${story.title}`}>
          Read more
        </Link>
      </div>
    </article>
  );
}
