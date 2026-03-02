import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default function ChangelogPage() {
  const updates = [
    {
      version: "2.1.0",
      date: "December 2024",
      type: "feature",
      changes: [
        "Added AI-powered competitor analysis dashboard",
        "Improved keyword discovery with multi-platform support",
        "Enhanced product listing optimization for Google Shopping",
        "New analytics dashboard with real-time metrics",
      ],
    },
    {
      version: "2.0.0",
      date: "November 2024",
      type: "major",
      changes: [
        "Complete platform redesign with modern UI",
        "Integrated Perplexity AI search optimization",
        "Added automated content generation for product descriptions",
        "Launched AI agent workflow for 24/7 optimization",
      ],
    },
    {
      version: "1.5.0",
      date: "October 2024",
      type: "feature",
      changes: [
        "Added Amazon integration",
        "Improved keyword tracking accuracy",
        "New competitor monitoring features",
        "Performance improvements and bug fixes",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">Changelog</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Stay up to date with the latest features, improvements, and bug fixes.
        </p>

        <div className="space-y-8">
          {updates.map((update) => (
            <Card key={update.version}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Version {update.version}</CardTitle>
                    <CardDescription>{update.date}</CardDescription>
                  </div>
                  <Badge variant={update.type === "major" ? "default" : "secondary"}>
                    {update.type === "major" ? "Major" : "Feature"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                  {update.changes.map((change, i) => (
                    <li key={i}>{change}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
