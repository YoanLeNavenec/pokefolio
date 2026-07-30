"use client";

import { deleteArtPiece } from '../actions'

const categoryLabels = {
  commande: "Commission",
  perso: "Personal project",
  asset_app: "Site asset",
  fanart: "Fanart",
};

export default function ArtPieceList({ artPieces }) {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-text-muted/20">
      <h3 className="text-sm font-mono text-text mb-3">Art pieces</h3>
      <ul className="flex flex-col gap-3">
        {artPieces?.map((artPiece) => (
          <li key={artPiece.id} className="bg-surface-2 rounded-xl p-3 border-2 border-accent-gold/60">
            <p className="text-text font-medium text-sm">{artPiece.title}</p>
            <p className="text-xs text-text-muted">{categoryLabels[artPiece.category]}</p>

            <div className="flex items-center gap-2 mt-3">
              <a href={`/admin/art/edit/${artPiece.id}`} className="text-xs font-mono text-accent-gold hover:underline">
                Edit
              </a>

              <form
                action={deleteArtPiece}
                onSubmit={(e) => {
                  const confirmed = confirm("Do you really want to delete this?");
                  if (!confirmed) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={artPiece.id}></input>
                <button type="submit" className="text-xs font-mono px-2 py-1 rounded-md bg-red-900/40 text-red-200 border border-red-700 hover:bg-red-900/60 transition-colors">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}