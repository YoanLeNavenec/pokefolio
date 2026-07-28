"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (error) {
    redirect("/login?error=1");
  }

  redirect("/admin");
}