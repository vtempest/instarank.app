"use server"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function logout() {
  const cookieStore = await cookies()
  
  // Clear the better-auth session cookie
  cookieStore.delete("better-auth.session_token")
  
  redirect("/")
}
