"use client";

import { deleteTag } from '../actions'

export default function TagList({ tags }) {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-text-muted/20">
      <h3 className="text-sm font-mono text-text mb-3">Tags</h3>
      <ul className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <li
            key={tag.id}
            className="flex items-center gap-2 text-xs pl-3 pr-1.5 py-1 rounded-full font-mono"
            style={{ backgroundColor: tag.color, color: '#16140f' }}
          >
            {tag.name}
            <form
              action={deleteTag}
              onSubmit={(e) => {
                const confirmed = confirm("Delete this tag?");
                if (!confirmed) {
                  e.preventDefault();
                }
              }}
            >
              <input type="hidden" name="id" value={tag.id}></input>
              <button type="submit" className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 hover:bg-black/40 transition-colors">
                ✕
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}