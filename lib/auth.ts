import { betterAuth } from "better-auth"
// import { drizzleAdapter } from "better-auth/adapters/drizzle"
// import { getDb } from "./db"

let databaseAdapter
// try {
//   const db = getDb()
//   if (db) {
//     databaseAdapter = drizzleAdapter(db, {
//       provider: "pg",
//     })
//   }
// } catch (error) {
//   console.log("[v0] Database not available during build, using fallback")
// }

export const auth = {
  api: {
    getSession: async () => null,
  }
}

export const authAPI = auth.api

export async function getSession() {
  return {
    session: null,
    user: null,
  }
}
