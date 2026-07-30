import { createArtPiece } from "../actions";

const inputClass = "bg-surface-2 text-text rounded-lg px-3 py-2 border border-text-muted/30 focus:border-accent-gold focus:outline-none w-full";
const labelClass = "flex flex-col gap-1 text-xs text-text-muted";

export default function ArtPieceForm() {
  return (
    <form action={createArtPiece} className="bg-surface rounded-2xl p-6 border-2 border-accent-gold shadow-lg flex flex-col gap-3">
      <h3 className="text-sm font-mono text-accent-gold mb-1">New art piece</h3>

      <label className={labelClass}>
        Title
        <input name="title" type="text" placeholder="title" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Description
        <input name="description" type="text" placeholder="description" className={inputClass} />
      </label>

      <label className={labelClass}>
        Cover image
        <input name="cover_image" type="file" className={inputClass} />
      </label>

      <label className={labelClass}>
        Gallery images
        <input name="gallery_images" type="file" multiple className={inputClass} />
      </label>

      <label className={labelClass}>
        Category
        <select name="category" required defaultValue="" className={inputClass}>
          <option value="" disabled>— Select category —</option>
          <option value="commande">Commission</option>
          <option value="perso">Personal project</option>
          <option value="asset_app">Site asset</option>
          <option value="fanart">Fanart</option>
        </select>
      </label>

      <label className={labelClass}>
        Date
        <input name="date" type="date" required className={inputClass} />
      </label>

      <label className={labelClass}>
        Client
        <input name="client" type="text" placeholder="client" className={inputClass} />
      </label>

      <label className={labelClass}>
        Source material
        <input name="source_material" type="text" placeholder="source_material" className={inputClass} />
      </label>

      <button type="submit" className="mt-2 font-mono text-sm px-4 py-2 rounded-lg bg-accent-gold text-bg hover:scale-[1.02] transition-transform">
        Add art piece
      </button>
    </form>
  );
}