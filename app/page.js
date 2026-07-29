/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      project_tags (
        tags ( id, name, color )
      )
    `)
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true })

  return (
    <>
    {projects?.length === 0 && <p>No projects yet.</p>}
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects?.map((project) => (
        <li
          className="bg-surface rounded-2xl p-3 shadow-[0_25px_40px_-15px_rgba(212,175,55,0.35)] max-w-[260px] mx-auto"
          key={project.id}
          style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: project.project_tags?.[0]?.tags?.color || '#4a7fb5' }}
        >
        <div className="flex items-center justify-between px-2 pb-2">
          <p className="text-text font-medium">{project.title}</p>
          {project.is_featured && <span className="text-accent-gold">★</span>}
        </div>

        <div className="h-40 rounded-lg overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-surface-2/60 rounded-md mt-2 px-3 py-1.5">
          <p className="text-xs text-text-muted">
            {project.project_tags?.map((pt) => pt.tags.name).join(' / ')}
          </p>
        </div>

        <div className="bg-surface-2 rounded-md mt-1.5 p-3 min-h-16">
          <p className="text-sm text-text">{project.description_long}</p>
        </div>
        <p className="text-xs italic text-text-muted px-2 pt-2 font-mono">
          « Created {new Date(project.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} »
        </p>
        </li>
      ))}
    </ul>
    </>
  )
}