"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//cleanup the name of the project
function safeFilePath(fileName) {
  const ext = fileName.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '');
  const randomId = Math.random().toString(36).slice(2, 8);
  return `${Date.now()}-${randomId}.${ext}`;
}

//create a new project function
export async function createProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const imageFile = formData.get("image");
  const filePath = safeFilePath(imageFile.name);


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
    throw new Error("Couldn't insert project");
  }

  const selectedTagIds = formData.getAll("tags");

  if (selectedTagIds.length > 0) {
    const rows = selectedTagIds.map((tagId) => ({
      projects_ref: newProject.id,
      tag_ref: tagId,
    }));

    const { error: tagsError } = await supabase.from("project_tags").insert(rows);

    if (tagsError) {
      console.error(tagsError);
      throw new Error("Couldn't add tags");
    }
  }

  redirect("/admin");
}

//delete an existing project function
export async function deleteProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete");
  }

  redirect('/admin');
}

//modify an existing project function
export async function modifyProject(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");
  const currentImageUrl = formData.get("current_image_url");
  const imageFile = formData.get("image");

  let imageUrl = currentImageUrl;
  if (imageFile.size > 0){
    const filePath = safeFilePath(imageFile.name);

    //error message on failure to update image
    const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filePath, imageFile);
    if (uploadError) {
      console.error(uploadError);
      throw new Error("Couldn't upload image");
    }

    const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  //update element
  const { error: updateError } = await supabase
  .from('projects')
  .update({
    title: formData.get("title"),
    date: formData.get("date"),
    description_long: formData.get("description_long"),
    difficulties: formData.get("difficulties"),
    demo_url: formData.get("demo_url"),
    repo_url: formData.get("repo_url"),
    image_url: imageUrl,
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order")),
  })
  .eq('id', id);

  //error message
  if (updateError) {
    console.error(updateError);
    throw new Error("Couldn't apply edits");
  }

  //fetch the tags, if there are any
  await supabase.from('project_tags').delete().eq('projects_ref', id);

  const selectedTagIds = formData.getAll("tags");

  if (selectedTagIds.length > 0) {
    const rows = selectedTagIds.map((tagId) => ({
      projects_ref: id,
      tag_ref: tagId,
    }));

    //error message
    const { error: tagsError } = await supabase.from('project_tags').insert(rows);

    if (tagsError) {
      console.error(tagsError);
      throw new Error("Couldn't associate tag");
    }
  }
  redirect('/admin');
}

//Create Tag Function
export async function createTag(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("tags").insert({
    name: formData.get("name"),
    color: formData.get("color"),
  });

  //error message
  if (error) {
    console.error(error);
    throw new Error("Couldn't create tag");
  }

  redirect("/admin");
}

//delete an existing tag function
export async function deleteTag(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");

  const { error } = await supabase.from('tags').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete");
  }
  redirect('/admin')
}

//art-side of the admin panel

//create a new art project function
export async function createArtPiece(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const coverFile = formData.get("cover_image");
  const filePath = safeFilePath(coverFile.name);

  //error handling
  const { error: uploadError } = await supabase.storage
    .from("project-images") // ← ou un nouveau bucket dédié, on en reparle si besoin
    .upload(filePath, coverFile);

  if (uploadError) {
    console.error(uploadError);
    throw new Error("Couldn't upload cover");
  }

  const { data: { publicUrl } } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  //create the element
  const { data: newArtPiece, error: insertError } = await supabase
    .from("art_pieces")
    .insert({
      title: formData.get("title"),
      category: formData.get("category"),
      cover_image_url: publicUrl,
      description: formData.get("description"),
      date: formData.get("date"),
      client: formData.get("client"),
      source_material: formData.get("source_material"),
    })
    .select()
    .single();

  //error message
  if (insertError) {
    console.error(insertError);
    throw new Error("Couldn't insert element");
  }

  //fetch all images storaged in DB
  const galleryFiles = formData.getAll("gallery_images");

  //handles absence of selection for images
  if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
    const galleryRows = [];

    //inserts images to project per index
    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];
      const galleryFilePath = safeFilePath(file.name);

      //error handling
      const { error: galleryUploadError } = await supabase.storage
        .from("project-images")
        .upload(galleryFilePath, file);

      if (galleryUploadError) {
        console.error(galleryUploadError);
        throw new Error("Couldn't upload image");
      }

      const { data: { publicUrl: galleryPublicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(galleryFilePath);

      galleryRows.push({
        art_piece_ref: newArtPiece.id,
        image_url: galleryPublicUrl,
        sort_order: i,
      });
    }

    //inserting images into the rows of the gallery
    const { error: galleryInsertError } = await supabase
      .from("art_piece_images")
      .insert(galleryRows);

    //error message
    if (galleryInsertError) {
      console.error(galleryInsertError);
      throw new Error("Couldn't insert images into gallery");
    }
  }

  redirect('/admin');
}

//delete an existing art project function
export async function deleteArtPiece(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id");

  const { error } = await supabase.from('art_pieces').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete");
  }

  redirect('/admin');
}

//modify an existing art project function
export async function modifyArtPiece(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  //fetch selected project and it's current cover
  const id = formData.get("id");
  const currentCoverImageUrl = formData.get("current_cover_image_url");
  const coverFile = formData.get("cover_image");

  let coverImageUrl = currentCoverImageUrl;

  if (coverFile.size > 0) {
    const filePath = safeFilePath(coverFile.name);

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, coverFile);

    if (uploadError) {
      console.error(uploadError);
      throw new Error("Échec de l'upload de la couverture");
    }

    const { data: { publicUrl } } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    coverImageUrl = publicUrl;
  }

  //apply the edits
  const { error: updateError } = await supabase
    .from('art_pieces')
    .update({
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      cover_image_url: coverImageUrl,
      date: formData.get("date"),
      client: formData.get("client"),
      source_material: formData.get("source_material"),
    })
    .eq('id', id);

  //error message
  if (updateError) {
    console.error(updateError);
    throw new Error("Échec de la modification de la pièce");
  }

  //get all images in the current carrousel
  const newGalleryFiles = formData.getAll("gallery_images");

  //adds new images to the carousel if some have been added
  if (newGalleryFiles.length > 0 && newGalleryFiles[0].size > 0) {
    const { data: existingImages } = await supabase
      .from('art_piece_images')
      .select()
      .eq('art_piece_ref', id);

    const startingSortOrder = existingImages?.length || 0;

    const galleryRows = [];

    for (let i = 0; i < newGalleryFiles.length; i++) {
      const file = newGalleryFiles[i];
      const galleryFilePath = safeFilePath(file.name);

      const { error: galleryUploadError } = await supabase.storage
        .from("project-images")
        .upload(galleryFilePath, file);

        //error message
      if (galleryUploadError) {
        console.error(galleryUploadError);
        throw new Error("Échec de l'upload d'une image de galerie");
      }

      const { data: { publicUrl: galleryPublicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(galleryFilePath);

      galleryRows.push({
        art_piece_ref: id,
        image_url: galleryPublicUrl,
        sort_order: startingSortOrder + i,
      });
    }

    const { error: galleryInsertError } = await supabase
      .from('art_piece_images')
      .insert(galleryRows);

    if (galleryInsertError) {
      console.error(galleryInsertError);
      throw new Error("Échec de l'insertion des images de galerie");
    }
  }

  redirect('/admin');
}

//logout function
export async function logout() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  redirect('/login');
}