import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for new sellers testing the waters",
    features: [
      "1 Amazon store",
      "25 products",
      "10 competitors tracked",
      "500 keywords/month",
      "5 AI listings/month",
      "10 blog posts/month",
      "1 social account",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    price: 149,
    description: "Most popular for growing sellers",
    features: [
      "3 Amazon stores",
      "100 products",
      "50 competitors tracked",
      "2,000 keywords/month",
      "25 AI listings/month",
      "40 blog posts/month",
      "5 social accounts",
      "A+ Content generation",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Professional",
    price: 399,
    description: "For established brands and agencies",
    features: [
      "10 Amazon stores",
      "500 products",
      "Unlimited competitors",
      "Unlimited keywords",
      "100 AI listings/month",
      "100 blog posts/month",
      "15 social accounts",
      "White-label options",
      "API access",
      "Dedicated manager",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Start with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border bg-background p-8 ${
                plan.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                  <span className="ml-2 text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need more?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Contact us
            </Link>{" "}
            for Enterprise pricing with custom limits and dedicated support.
          </p>
        </div>
      </div>
    </section>
  )
}
