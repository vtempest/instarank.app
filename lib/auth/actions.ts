"use server"

import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  return { error: "Please use Google Sign In" }
}

export async function login(formData: FormData) {
  return { error: "Please use Google Sign In" }
}

export async function logout() {
  redirect("/")
}
