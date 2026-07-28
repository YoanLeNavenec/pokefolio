import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { modifyProject } from '../../actions'

export default async function Page({params}) { 
  const cookieStore = await cookies() 
  const supabase = createClient(cookieStore) 

  const { id } = await params;
  const { data: project, error: editError } = await supabase
  .from('projects')
  .select(`
    *,
    project_tags (
      tags ( id, name, color )
    )
  `)
  .eq('id', id)
  .single();
  
  if (editError) {
    console.error(editError);
    throw new Error("Couldn't edit project");
  }

  const { data: tags } = await supabase.from('tags').select()

  return(
  <form action={modifyProject}>
        <input name="title" type="text" defaultValue={project.title} required/>
        <input name="date" type="date"  defaultValue={project.date} required/>
        <textarea name="description_long" defaultValue={project.description_long}></textarea>
        <textarea name="difficulties" defaultValue={project.difficulties}></textarea>
        <input name="demo_url" type="text" defaultValue={project.demo_url}/>
        <input name="repo_url" type="text" defaultValue={project.repo_url} required/>
        <input name="image" type="file" accept="image/*"/>
        <input type="hidden" name="current_image_url" value={project.image_url} />
        <input type="hidden" name="id" value={project.id}/>
        <label>
          Featured?
          <input name="is_featured" type="checkbox" defaultChecked={project.is_featured}/>
        </label>
        <input name="sort_order" type="number" defaultValue={project.sort_order} required/>
        {tags?.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" name="tags" value={tag.id} defaultChecked={project.project_tags?.some((pt) => pt.tags.id === tag.id)}/>
            {tag.name}
          </label>
        ))}
        <button type="submit">Modify the project</button>
  </form>
)
}
