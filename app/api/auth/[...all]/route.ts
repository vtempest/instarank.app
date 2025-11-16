export async function GET() {
  return Response.json({ error: "Authentication temporarily disabled" }, { status: 501 })
}

export async function POST() {
  return Response.json({ error: "Authentication temporarily disabled" }, { status: 501 })
}
