"use server"

export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  })

  // Redirect handled by the client after action completes
  return { success: true }
}
