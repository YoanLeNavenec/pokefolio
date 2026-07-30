import { createTag } from '../actions'

const inputClass = "bg-surface-2 text-text rounded-lg px-3 py-2 border border-text-muted/30 focus:border-accent-gold focus:outline-none w-full";
const labelClass = "flex flex-col gap-1 text-xs text-text-muted";

export default function FormTag() {
  return (
    <form action={createTag} className="bg-surface rounded-2xl p-6 border-2 border-accent-gold shadow-lg flex flex-col gap-3">
      <h3 className="text-sm font-mono text-accent-gold mb-1">New tag</h3>
      <label className={labelClass}>
        Name
        <input name="name" type="text" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Color
        <input name="color" type="color" className="w-full h-10 rounded-lg border border-text-muted/30 bg-surface-2" />
      </label>

      <button type="submit" className="mt-2 font-mono text-sm px-4 py-2 rounded-lg bg-accent-gold text-bg hover:scale-[1.02] transition-transform">
        Add tag
      </button>
    </form>
  );
}