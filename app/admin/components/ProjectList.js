import { deleteProject } from "../actions";

export default function ProjectList({projects}){
  return (
    <ul>
      {projects?.map((project) => (
        <li key={project.id}>
          {project.title}
          {project.project_tags?.map((pt) => (
            <span key={pt.tags.id}> {pt.tags.name}</span>
          ))}
          <a href={`/admin/edit/${project.id}`}>Modifier</a>
          <form action={deleteProject}>
            <input type='hidden' name='id' value={project.id}></input>
            <button type='submit'>Supprimer</button>
          </form>
        </li>
      ))}
    </ul>
  )
}