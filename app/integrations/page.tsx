import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Google Shopping",
      description: "Sync products and optimize listings for Google Shopping search results",
      status: "active",
      features: ["Product feed optimization", "Performance tracking", "Automated bidding"],
    },
    {
      name: "Amazon",
      description: "Connect your Amazon Seller Central account for automated listing optimization",
      status: "active",
      features: ["Listing optimization", "Competitor tracking", "Review monitoring"],
    },
    {
      name: "Perplexity AI",
      description: "Optimize for AI-powered search and recommendations on Perplexity",
      status: "coming-soon",
      features: ["AI search optimization", "Citation tracking", "Content enhancement"],
    },
    {
      name: "ChatGPT Search",
      description: "Ensure your products appear in ChatGPT search results",
      status: "coming-soon",
      features: ["Search optimization", "Product descriptions", "FAQ optimization"],
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
        <h1 className="mb-4 text-4xl font-bold">Integrations</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Connect InstaRank with your favorite platforms to automate product optimization across multiple channels.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {integrations.map((integration) => (
            <Card key={integration.name}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{integration.name}</CardTitle>
                  <Badge variant={integration.status === "active" ? "default" : "secondary"}>
                    {integration.status === "active" ? "Active" : "Coming Soon"}
                  </Badge>
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {integration.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
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
