'use client';

import { deleteStory } from '@/app/admin/actions';

export default function DeleteStoryButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteStory.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="adm-link danger">
        Delete
      </button>
    </form>
  );
}
