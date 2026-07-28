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
    <ul>
      {projects?.map((project) => (
        <li key={project.id}>
          {project.title}
          {project.project_tags?.map((pt) => (
            <span key={pt.tags.id}> {pt.tags.name}</span>
          ))}
          <img src={project.image_url} alt={project.title}></img>
        </li>
      ))}
    </ul>
  )
}