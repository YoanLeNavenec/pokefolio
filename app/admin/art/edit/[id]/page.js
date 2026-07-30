import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { modifyArtPiece } from '../../../actions'

export default async function Page({params}) { 
  const cookieStore = await cookies() 
  const supabase = createClient(cookieStore) 

  const { id } = await params;
  const { data: artPiece, error: editError } = await supabase
  .from('art_pieces')
  .select()
  .eq('id', id)
  .single();

  const {data: artPiecesImages, error: findError} = await supabase
  .from('art_piece_images')
  .select()
  .eq('art_piece_ref', id)
  
  if (editError) {
    console.error(editError);
    throw new Error("Couldn't edit project");
  }

  return(
  <form action={modifyArtPiece}>
                <input name="title" type="text" placeholder="title" defaultValue={artPiece.title} required></input>
                <input name="description" type="text" placeholder="description" defaultValue={artPiece.description}></input>
                <input name="gallery_images" type="file" multiple></input>
                <select name="category" required defaultValue={artPiece.category}>
                  <option value="commande">Commission</option>
                  <option value="perso">Personal project</option>
                  <option value="asset_app">Site asset</option>
                  <option value="fanart">Fanart</option>
                </select>
                <input name="date" type="date" required defaultValue={artPiece.date}></input>
                <input name="client" type="text" placeholder="client" defaultValue={artPiece.client}></input>
                <input name="source_material" type="text" placeholder="source_material" defaultValue={artPiece.source_material}></input>
                <input type="hidden" name="current_cover_image_url" value={artPiece.cover_image_url} />
                <input name="cover_image" type="file"></input>
                <input type="hidden" name="id" value={artPiece.id}/>
                <button type="submit">Apply edits</button>
              </form>
)
}
