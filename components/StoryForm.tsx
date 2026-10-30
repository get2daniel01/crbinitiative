'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { STORY_BUCKET } from '@/lib/supabase/env';
import { saveStory } from '@/app/admin/actions';

type Initial = {
  id?: string;
  title: string;
  story_date: string;
  body: string;
  image_url: string;
  featured: boolean;
};

const MAX_UPLOAD_MB = 15;

async function shrinkImage(file: File, maxWidth = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not process the picture.'))), 'image/jpeg', 0.85),
  );
}

export default function StoryForm({ initial, featuredCount }: { initial: Initial; featuredCount: number }) {
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(initial.image_url);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [pending, startTransition] = useTransition();
  const editing = Boolean(initial.id);
  const working = busy || pending;

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setError('');
    if (f && !f.type.startsWith('image/')) {
      setError('Choose a picture file (JPG, PNG or WebP).');
      e.target.value = '';
      return;
    }
    if (f && f.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setError(`That picture is larger than ${MAX_UPLOAD_MB} MB. Choose a smaller one.`);
      e.target.value = '';
      return;
    }
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const title = String(form.get('title') ?? '').trim();
    const story_date = String(form.get('story_date') ?? '');
    const body = String(form.get('body') ?? '').trim();
    const featured = form.get('featured') === 'on';

    if (!title || !story_date || !body) return setError('Add a title, date and the full story.');
    if (!file && !initial.image_url) return setError('Add a picture for the story.');

    setBusy(true);
    try {
      let image_url = initial.image_url;
      if (file) {
        const blob = await shrinkImage(file);
        const path = `${crypto.randomUUID()}.jpg`;
        const supabase = createClient();
        const { error: upErr } = await supabase.storage
          .from(STORY_BUCKET)
          .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
        if (upErr) throw new Error(`Picture upload failed: ${upErr.message}`);
        image_url = supabase.storage.from(STORY_BUCKET).getPublicUrl(path).data.publicUrl;
      }
      startTransition(async () => {
        const res = await saveStory({ id: initial.id, title, story_date, body, image_url, featured });
        if (res?.error) {
          setError(res.error);
          setBusy(false);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      setBusy(false);
    }
  }

  const limitReached = featuredCount >= 6 && !initial.featured;

  return (
    <form className="adm-form" onSubmit={onSubmit} noValidate>
      <label className="fld">
        <span>Title</span>
        <input name="title" defaultValue={initial.title} maxLength={140} required />
      </label>

      <label className="fld">
        <span>Date</span>
        <input type="date" name="story_date" defaultValue={initial.story_date} required />
      </label>

      <div className="fld">
        <span>Picture</span>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="adm-preview" src={preview} alt="Selected story picture" />
        )}
        <input type="file" accept="image/*" onChange={onFile} aria-label="Choose picture" />
        <small>{editing ? 'Leave empty to keep the current picture. ' : ''}Large pictures are resized automatically.</small>
      </div>

      <label className="fld">
        <span>Full story</span>
        <textarea name="body" rows={14} defaultValue={initial.body} required />
        <small>Leave a blank line between paragraphs.</small>
      </label>

      <label className="chk">
        <input type="checkbox" name="featured" defaultChecked={initial.featured} disabled={limitReached} />
        <span>
          Show on the Impact page
          {limitReached && ' (6 stories are already selected. Remove one first.)'}
        </span>
      </label>

      {error && (
        <p className="adm-error" role="alert">
          {error}
        </p>
      )}

      <div className="adm-actions">
        <button className="btn" type="submit" disabled={working}>
          {working ? 'Saving…' : editing ? 'Save changes' : 'Publish story'}
        </button>
        <Link className="btn o" href="/admin">
          Cancel
        </Link>
      </div>
    </form>
  );
}
