import { deleteProject } from "../actions";

export default function ProjectList({ projects }) {
  return (
    <ul>
      {projects?.map((project) => (
        <li
          key={project.id}
          className="bg-surface rounded-2xl p-3 shadow-lg"
          style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: project.project_tags?.[0]?.tags?.color || '#4a7fb5' }}
        >
          <div className="flex items-center justify-between px-2 pb-2">
            <p className="text-text font-medium">{project.title}</p>
            {project.is_featured && <span className="text-accent-gold">★</span>}
          </div>

          {project.project_tags?.map((pt) => (
            <span key={pt.tags.id}> {pt.tags.name}</span>
          ))}

          <a href={`/admin/edit/${project.id}`}>Edit</a>

          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id}></input>
            <button type="submit">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  )
}