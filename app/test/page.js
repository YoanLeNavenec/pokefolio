import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createProject, createTag, deleteProject } from "./actions"

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
  return ( 
    <>
    <p>Nombre de projets : {projects?.length}</p>
    <ul> 
      <form action={createProject}>
        <input name="title" type="text" placeholder="Titre" required />
        <input name="date" type="date" required />
        <textarea name="description_long" placeholder="Description longue"></textarea>
        <textarea name="difficulties" placeholder="Difficultés rencontrées"></textarea>
        <input name="demo_url" type="text" placeholder="Lien démo" />
        <input name="repo_url" type="text" placeholder="Lien repo" required />
        <input name="image" type="file" accept="image/*" required />
        <label>
          <input name="is_featured" type="checkbox" /> Featured
        </label>
        <input name="sort_order" type="number" defaultValue={0} required />
        {tags?.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" name="tags" value={tag.id} />
            {tag.name}
          </label>
        ))}
        <button type="submit">Ajouter le projet</button>
      </form>
    {projects?.map((project) => (
      <li key={project.id}>
      {project.title}
      {project.project_tags?.map((pt) => (
        <span key={pt.tags.id}> {pt.tags.name}</span>
      ))}
      <form action={deleteProject}>
        <input type='hidden' name='id' value={project.id}></input>
        <button type='submit'>delete</button>
      </form>
      <a href={`/test/edit/${project.id}`}>Modifier</a>
      </li>
      ))}
  </ul>
  <form action={createTag}> 
    <input name="name"></input> 
    <input name="color" type="color"></input> 
    <button type="submit">submit</button>
    </form>
  <ul>
    {tags?.map((tag) => (
      <li key={tag.id} style={{ color: tag.color }}>{tag.name}</li>
    ))}
  </ul>
  </>
  ) 
}