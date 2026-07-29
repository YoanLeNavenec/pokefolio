import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import  ProjectForm  from './components/ProjectForm'
import  ProjectList  from './components/ProjectList'
import  TagForm  from './components/TagForm'
import  TagList  from './components/TagList'
import ArtPieceForm from './components/ArtPieceForm'
import ArtPieceList from './components/ArtPieceList'

export default async function Page() { 
  const cookieStore = await cookies() 
  const supabase = createClient(cookieStore) 
  
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data) {
    redirect('/login')
  }

  const { data: projects } = await supabase
  .from('projects')
  .select(`
    *,
    project_tags (
      tags ( id, name, color )
    )
  `)

  const { data: tags } = await supabase.from('tags').select()

  const { data: artPieces, error: artPiecesError } = await supabase.from('art_pieces').select()
  console.log('artPieces:', artPieces)
  console.log('artPiecesError:', artPiecesError)

  return (
    <>
    <ProjectList projects={projects}></ProjectList>
    <ProjectForm tags={tags}></ProjectForm>
    <TagList tags={tags}></TagList>
    <TagForm></TagForm>
    <ArtPieceList artPieces={artPieces}></ArtPieceList>
    <ArtPieceForm/>
    </>
  )
}