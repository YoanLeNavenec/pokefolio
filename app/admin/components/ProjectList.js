"use client";

import { deleteProject } from "../actions";

export default function ProjectList({ projects }) {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-text-muted/20">
      <h3 className="text-sm font-mono text-text mb-3">Projects</h3>
      <ul className="flex flex-col gap-3">
        {projects?.map((project) => (
          <li
            key={project.id}
            className="bg-surface-2 rounded-xl p-3"
            style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: project.project_tags?.[0]?.tags?.color || '#4a7fb5' }}
          >
            <div className="flex items-center justify-between">
              <p className="text-text font-medium text-sm">{project.title}</p>
              {project.is_featured && <span className="text-accent-gold">★</span>}
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {project.project_tags?.map((pt) => (
                <span key={pt.tags.id} className="text-xs text-text-muted">{pt.tags.name}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <a href={`/admin/edit/${project.id}`} className="text-xs font-mono text-accent-gold hover:underline">
                Edit
              </a>

              <form
                action={deleteProject}
                onSubmit={(e) => {
                  const confirmed = confirm("Do you really want to delete this?");
                  if (!confirmed) {
                    e.preventDefault();
                  }
                }}
              >
                <input type="hidden" name="id" value={project.id}></input>
                <button type="submit" className="text-xs font-mono px-2 py-1 rounded-md bg-red-900/40 text-red-200 border border-red-700 hover:bg-red-900/60 transition-colors">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}