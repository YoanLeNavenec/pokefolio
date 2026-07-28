"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const imageFile = formData.get("image");
  const filePath = `${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, imageFile);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("Échec de l'upload de l'image");
  }

  const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  // ← changement 1 : .select().single() pour récupérer la ligne créée, avec son id généré
  const { data: newProject, error: insertError } = await supabase
    .from("projects")
    .insert({
      title: formData.get("title"),
      date: formData.get("date"),
      description_long: formData.get("description_long"),
      difficulties: formData.get("difficulties"),
      demo_url: formData.get("demo_url"),
      repo_url: formData.get("repo_url"),
      image_url: publicUrl,
      is_featured: formData.get("is_featured") === "on",
      sort_order: Number(formData.get("sort_order")),
    })
    .select()
    .single();

  if (insertError) {
    console.error(insertError);
    throw new Error("Échec de l'insertion du projet");
  }

  // ← changement 2 : associer les tags cochés à ce nouveau projet
  const selectedTagIds = formData.getAll("tags");

  if (selectedTagIds.length > 0) {
    const rows = selectedTagIds.map((tagId) => ({
      projects_ref: newProject.id,
      tag_ref: tagId,
    }));

    const { error: tagsError } = await supabase.from("project_tags").insert(rows);

    if (tagsError) {
      console.error(tagsError);
      throw new Error("Échec de l'association des tags");
    }
  }

  redirect("/admin");
}

export async function deleteProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Échec de la suppression");
  }

  redirect('/admin');
}

export async function modifyProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");
  const currentImageUrl = formData.get("current_image_url");
  const imageFile = formData.get("image");

  let imageUrl = currentImageUrl; // ← valeur par défaut : on garde l'ancienne
  if (imageFile.size > 0){
    const filePath = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, imageFile);
    if (uploadError) {
      console.error(uploadError);
      throw new Error("Échec de l'upload de l'image");
    }

    const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

    imageUrl = publicUrl; // ← sans "const", tu réassignes la variable existante
  }

  const { error: updateError } = await supabase
  .from('projects')
  .update({
    title: formData.get("title"),
    date: formData.get("date"),
    description_long: formData.get("description_long"),
    difficulties: formData.get("difficulties"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    image_url: imageUrl, // ← soit l'ancienne, soit la nouvelle, selon le if au-dessus
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order")),
  })
  .eq('id', id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Échec de la modification du projet");
  }

  await supabase.from('project_tags').delete().eq('projects_ref', id);

  const selectedTagIds = formData.getAll("tags");

  if (selectedTagIds.length > 0) {
    const rows = selectedTagIds.map((tagId) => ({
      projects_ref: id,
      tag_ref: tagId,
    }));

    const { error: tagsError } = await supabase.from('project_tags').insert(rows);

    if (tagsError) {
      console.error(tagsError);
      throw new Error("Échec de l'association des tags");
    }
  }
  redirect('/admin');
}

export async function createTag(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("tags").insert({
    name: formData.get("name"),
    color: formData.get("color"),
  });

  if (error) {
    console.error(error);
    throw new Error("Échec de la création du tag");
  }

  redirect("/admin");
}