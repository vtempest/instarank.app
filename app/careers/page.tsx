import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin } from "lucide-react"

export default function CareersPage() {
  const positions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and improve our AI-powered optimization agents that help sellers rank higher.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive interfaces that make complex e-commerce optimization simple and accessible.",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers succeed by providing expert guidance on product optimization strategies.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Lead our marketing efforts to reach e-commerce sellers who need automated optimization.",
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
        <h1 className="mb-4 text-4xl font-bold">Careers</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Join our mission to revolutionize e-commerce optimization with AI. We're always looking for talented people
          who are passionate about helping businesses grow.
        </p>

        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Why Join InstaRank?</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Work on cutting-edge AI technology that impacts real businesses</li>
            <li>100% remote-first company with flexible work hours</li>
            <li>Competitive salary and equity packages</li>
            <li>Unlimited PTO and comprehensive health benefits</li>
            <li>Annual learning and development budget</li>
          </ul>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Open Positions</h2>
        <div className="space-y-4">
          {positions.map((position) => (
            <Card key={position.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{position.title}</CardTitle>
                    <CardDescription className="mt-2">{position.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{position.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{position.department}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {position.location}
                  </span>
                </div>
                <Button className="mt-4" asChild>
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
