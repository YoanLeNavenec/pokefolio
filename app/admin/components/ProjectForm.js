import { createProject } from "../actions";

const inputClass = "bg-surface-2 text-text rounded-lg px-3 py-2 border border-text-muted/30 focus:border-accent-gold focus:outline-none w-full";
const labelClass = "flex flex-col gap-1 text-xs text-text-muted";

export default function ProjectForm({ tags }) {
  return (
    <form action={createProject} className="bg-surface rounded-2xl p-6 border-2 border-[#4a7fb5] shadow-lg flex flex-col gap-3">
      <h3 className="text-sm font-mono text-accent-gold mb-1">New Project</h3>
      <label className={labelClass}>
        Title
        <input name="title" type="text" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Date
        <input name="date" type="date" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Long description
        <textarea name="description_long" className={inputClass} rows={3} />
      </label>

      <label className={labelClass}>
        Challenges faced
        <textarea name="difficulties" className={inputClass} rows={2} />
      </label>

      <label className={labelClass}>
        Demo link
        <input name="demo_url" type="text" className={inputClass} />
      </label>

      <label className={labelClass}>
        Repo link
        <input name="repo_url" type="text" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Cover image
        <input name="image" type="file" accept="image/*" required className={inputClass} />
      </label>

      <label className="flex items-center gap-2 text-xs text-text-muted">
        <input name="is_featured" type="checkbox" />
        Featured
      </label>

      <label className={labelClass}>
        Sort order
        <input name="sort_order" type="number" defaultValue={0} required className={inputClass} />
      </label>

      <div className="flex flex-wrap gap-3 pt-1">
        {tags?.map((tag) => (
          <label key={tag.id} className="flex items-center gap-1.5 text-xs text-text-muted">
            <input type="checkbox" name="tags" value={tag.id} />
            {tag.name}
          </label>
        ))}
      </div>

      <button type="submit" className="mt-2 font-mono text-sm px-4 py-2 rounded-lg bg-accent-gold text-bg hover:scale-[1.02] transition-transform">
        Add project
      </button>
    </form>
  );
}