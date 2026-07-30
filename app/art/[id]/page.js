/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Nav from '../../components/Nav'

const categoryLabels = {
  commande: "Commission",
  perso: "Personal project",
  asset_app: "Site asset",
  fanart: "Fanart",
};

export default async function Page({ params }) {
  const { id } = await params;
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: artPiece } = await supabase
    .from('art_pieces')
    .select()
    .eq('id', id)
    .single()

  const { data: galleryImages } = await supabase
    .from('art_piece_images')
    .select()
    .eq('art_piece_ref', id)
    .order('sort_order', { ascending: true })

  return (
    <div className="min-h-screen p-6">
      <Nav />
      <Link href="/art" className="text-sm font-mono text-accent-gold hover:underline">← Back</Link>

      <div className="max-w-2xl mx-auto mt-6 bg-surface rounded-2xl p-6 border-4 border-accent-gold">
        <h1 className="text-2xl text-text font-medium mb-1">{artPiece?.title}</h1>
        <p className="text-xs text-text-muted mb-4">{categoryLabels[artPiece?.category]}</p>

        <img src={artPiece?.cover_image_url} alt={artPiece?.title} className="w-full rounded-lg mb-4" />

        <p className="text-text mb-4">{artPiece?.description}</p>

        {artPiece?.client && <p className="text-sm text-text-muted mb-1">Client: {artPiece.client}</p>}
        {artPiece?.source_material && <p className="text-sm text-text-muted mb-4">Fandom: {artPiece.source_material}</p>}

        {galleryImages?.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-mono text-text-muted mb-2">Gallery</h2>
            <div className="grid grid-cols-2 gap-2">
              {galleryImages.map((img) => (
                <img key={img.id} src={img.image_url} alt="" className="w-full rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}