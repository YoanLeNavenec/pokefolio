import { createArtPiece } from "../actions";

export default function ArtPieceForm() {
  return (
    <>
      <form action={createArtPiece}>
        <input name="title" type="text" placeholder="title" required></input>
        <input name="description" type="text" placeholder="description"></input>
        <input name="cover_image" type="file"></input>
        <input name="gallery_images" type="file" multiple></input>
        <select name="category" required defaultValue="">
          <option value="" disabled>— Select category —</option>
          <option value="commande">Commission</option>
          <option value="perso">Personal project</option>
          <option value="asset_app">Site asset</option>
          <option value="fanart">Fanart</option>
        </select>
        <input name="date" type="date" required></input>
        <input name="client" type="text" placeholder="client"></input>
        <input name="source_material" type="text" placeholder="source_material"></input>
        <button type="submit">Add Project</button>
      </form>
    </>
  )
}