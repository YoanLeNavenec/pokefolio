import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import TagForm from './components/TagForm'
import TagList from './components/TagList'
import ArtPieceForm from './components/ArtPieceForm'
import ArtPieceList from './components/ArtPieceList'
import Nav from '../components/Nav'
import { logout } from './actions'

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

  const { data: artPieces } = await supabase.from('art_pieces').select()

  return (
    <div className="min-h-screen p-6">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-mono text-text">Admin dashboard</h1>
        <Nav />
        <form action={logout}>
          <button type="submit" className="text-xs font-mono px-3 py-1.5 rounded-md bg-red-900/40 text-red-200 border border-red-700 hover:bg-red-900/60 transition-colors">
            Logout
          </button>
        </form>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-mono text-text mb-4 border-b border-text-muted/20 pb-2">Add new</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <ProjectForm tags={tags} />
          <TagForm />
          <ArtPieceForm />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-mono text-text mb-4 border-b border-text-muted/20 pb-2">Manage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <ProjectList projects={projects} />
          <TagList tags={tags} />
          <ArtPieceList artPieces={artPieces} />
        </div>
      </section>
    </div>
  )
}