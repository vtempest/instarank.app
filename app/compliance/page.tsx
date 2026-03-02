import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function CompliancePage() {
  const standards = [
    {
      name: "GDPR Compliance",
      description: "We comply with the General Data Protection Regulation for EU users",
    },
    {
      name: "SOC 2 Type II",
      description: "Our security controls are audited annually by independent third parties",
    },
    {
      name: "ISO 27001",
      description: "We maintain an information security management system certified to ISO 27001",
    },
    {
      name: "PCI DSS",
      description: "Payment data is processed in compliance with PCI Data Security Standards",
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
        <h1 className="mb-4 text-4xl font-bold">Compliance</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          At InstaRank, we take security and compliance seriously. We adhere to industry-leading standards to protect
          your data.
        </p>

        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">Security & Privacy</h2>
          <p className="text-muted-foreground">
            We implement robust security measures to protect your data, including end-to-end encryption, regular
            security audits, and strict access controls. Your data is stored securely and never shared with third
            parties without your explicit consent.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Compliance Standards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {standards.map((standard) => (
            <Card key={standard.name}>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{standard.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{standard.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
          <h3 className="mb-2 font-semibold">Questions about compliance?</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            If you have specific compliance or security questions, our team is here to help.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Security Team</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
