import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Zap, Target } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Amazon Optimization</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Dominate Amazon with <span className="text-primary">AI-Powered</span> SEO & Marketing
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl">
            End-to-end automation from competitor intelligence to content generation. Save 15-20 hours weekly and
            increase sales by up to 56%.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/signup">
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>56% Average Sales Increase</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              <span>15-20 Hours Saved Weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
            <img src="/modern-dashboard-interface-showing-amazon-product-.jpg" alt="InstaRank Dashboard" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
