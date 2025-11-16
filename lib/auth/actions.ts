"use server"

import { redirect } from 'next/navigation'
import { auth } from "@/lib/auth"

export async function signup(formData: FormData) {
  return { error: "Please use Google Sign In" }
}

export async function login(formData: FormData) {
  return { error: "Please use Google Sign In" }
}

export async function logout() {
  await auth.api.signOut({
    headers: await import("next/headers").then(m => m.cookies()),
  })
  redirect("/")
}
