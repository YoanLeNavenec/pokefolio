"use client";

import {deleteArtPiece} from '../actions'

export default function ArtPieceList({artPieces}){
  return (
      <ul>
        {artPieces?.map((artPiece) => (
          <li key={artPiece.id} className="bg-surface rounded-2xl p-3 shadow-lg">
            <p>{artPiece.title}</p>
            <p className="text-xs text-text-muted">{artPiece.category}</p>
            

            <a href={`/admin/art/edit/${artPiece.id}`}>Edit</a>
            <form action={deleteArtPiece} onSubmit={(e) => {
              const confirmed = confirm("Do you really want to delete this?");
              if (!confirmed) {
                e.preventDefault();
              }
            }}>
            <input type="hidden" name="id" value={artPiece.id}></input>
            <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    )
}