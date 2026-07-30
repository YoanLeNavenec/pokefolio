/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Nav from '../../components/Nav'

export default async function Page({ params }) {
  const { id } = await params;
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: project } = await supabase
    .from('projects')
    .select(`*, project_tags ( tags ( id, name, color ) )`)
    .eq('id', id)
    .single()

  return (
    <div className="min-h-screen p-6">
      <Nav />
      <Link href="/dev" className="text-sm font-mono text-accent-gold hover:underline">← Back</Link>

      <div className="max-w-2xl mx-auto mt-6 bg-surface rounded-2xl p-6 border-4" style={{ borderColor: project?.project_tags?.[0]?.tags?.color || '#4a7fb5' }}>
        <h1 className="text-2xl text-text font-medium mb-2">{project?.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {project?.project_tags?.map((pt) => (
            <span key={pt.tags.id} className="text-xs font-mono px-2 py-1 rounded-full" style={{ backgroundColor: pt.tags.color, color: '#16140f' }}>
              {pt.tags.name}
            </span>
          ))}
        </div>

        <img src={project?.image_url} alt={project?.title} className="w-full rounded-lg mb-4" />

        <p className="text-text mb-4">{project?.description_long}</p>

        {project?.difficulties && (
          <div className="mb-4">
            <h2 className="text-sm font-mono text-text-muted mb-1">Challenges</h2>
            <p className="text-text text-sm">{project.difficulties}</p>
          </div>
        )}

        <div className="flex gap-4 mt-4">
          {project?.demo_url && (
            <a href={project.demo_url} target="_blank" className="text-sm font-mono text-accent-gold hover:underline">Demo →</a>
          )}
          {project?.repo_url && (
            <a href={project.repo_url} target="_blank" className="text-sm font-mono text-accent-gold hover:underline">Repo →</a>
          )}
        </div>
      </div>
    </div>
  )
}