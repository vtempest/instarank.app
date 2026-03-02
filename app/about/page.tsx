import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Target, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">About InstaRank</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          We're on a mission to help e-commerce sellers rank #1 across Google, Amazon, and AI-powered search engines.
        </p>

        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            InstaRank was founded by a team of e-commerce entrepreneurs who experienced firsthand the challenges of
            managing product optimization across multiple platforms. We spent countless hours researching competitors,
            discovering keywords, and optimizing listings manually.
          </p>
          <p className="text-muted-foreground">
            We built InstaRank to automate these time-consuming tasks using AI agents that work 24/7. Our platform helps
            sellers save 15-20 hours weekly while increasing their sales by an average of 56%.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <Target className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Result-Driven</h3>
              <p className="text-sm text-muted-foreground">
                We focus on delivering measurable results that directly impact your bottom line.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Zap className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                We leverage cutting-edge AI technology to stay ahead of the competition.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Customer Success</h3>
              <p className="text-sm text-muted-foreground">
                Your success is our success. We're committed to helping you grow your business.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
