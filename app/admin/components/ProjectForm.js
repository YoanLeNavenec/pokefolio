import { createProject } from "../actions";

export default function ProjectForm({ tags }) {
  return (
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
  )
}