/* eslint-disable @next/next/no-img-element */
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Nav from '../components/Nav'
import Link from 'next/link'

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
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(74,127,181,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(74,127,181,0.18) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 30% 50%, rgba(74,127,181,0.35), transparent 60%)' }}
      />
    </div>
    <div className="relative z-10">
    <Nav />
    {projects?.length === 0 && <p>No projects yet.</p>}
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects?.map((project) => (
        <li
          className="bg-surface rounded-2xl p-3 shadow-[0_25px_40px_-15px_rgba(212,175,55,0.35)] max-w-65 mx-auto"
          key={project.id}
          style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: project.project_tags?.[0]?.tags?.color || '#4a7fb5' }}
        >
          <Link href={`/dev/${project.id}`} className="block">
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
        </Link>
        </li>
      ))}
    </ul>
    </div>
    </div>
  )
}