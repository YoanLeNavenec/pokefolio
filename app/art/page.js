/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Nav from '../components/Nav'

const categoryLabels = {
    commande: "Commission",
    perso: "Personal project",
    asset_app: "Site asset",
    fanart: "Fanart",
  };

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: artPieces } = await supabase
    .from('art_pieces')
    .select()
    .order('date', { ascending: false })


  return (
    <>
    <Nav />
    {artPieces?.length === 0 && <p>No projects yet.</p>}
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {artPieces?.map((artPiece) => (
        <li
          className="bg-surface rounded-2xl p-3 shadow-[0_25px_40px_-15px_rgba(212,175,55,0.35)] max-w-65 mx-auto"
          key={artPiece.id}>

        <p className="text-text font-medium">{artPiece.title}</p>
        <p className="text-xs text-text-muted">{categoryLabels[artPiece.category]}</p>
        <div className="h-40 rounded-lg overflow-hidden">
          <img
            src={artPiece.cover_image_url}
            alt={artPiece.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-surface-2 rounded-md mt-1.5 p-3 min-h-16">
          <p className="text-sm text-text">{artPiece.description}</p>
        </div>
        <p className="text-xs italic text-text-muted px-2 pt-2 font-mono">
          « Created {new Date(artPiece.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} »
        </p>
        </li>
      ))}
    </ul>
    </>
  )
} 