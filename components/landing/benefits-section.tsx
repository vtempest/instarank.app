import { TrendingUp, Clock, DollarSign, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    stat: "56%",
    label: "Average Sales Increase",
    description: "Optimized listings drive more conversions and higher rankings",
  },
  {
    icon: Clock,
    stat: "15-20hrs",
    label: "Saved Per Week",
    description: "Automate research, content creation, and social media management",
  },
  {
    icon: DollarSign,
    stat: "$150/mo",
    label: "Average Plan Cost",
    description: "Replaces 3-5 separate tools with one integrated platform",
  },
  {
    icon: BarChart3,
    stat: "1.9M",
    label: "Active E-commerce Sellers",
    description: "Join thousands of sellers optimizing across Google, Amazon, and AI search",
  },
]

export function BenefitsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for E-commerce Sellers Who Want to Scale
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Stop juggling multiple tools. Get everything you need to optimize, market, and grow your business across
            Google Shopping, Amazon, Perplexity, and AI-powered search.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.label}
                className="flex flex-col items-center text-center rounded-lg border border-border bg-background p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-2 text-4xl font-bold text-foreground">{benefit.stat}</div>
                <div className="mb-2 font-semibold text-foreground">{benefit.label}</div>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
