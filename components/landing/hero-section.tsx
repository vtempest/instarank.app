import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { AuroraText } from "@/components/ui/aurora-text"
import { ArrowRight, TrendingUp, Zap, Target, Eye } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-block">
            <GradientButton>
              <Zap className="mr-2 h-4 w-4" />
              <span
                className="animate-[shimmer_8s_infinite] bg-gradient-to-r from-transparent via-foreground via-50% to-transparent bg-clip-text bg-no-repeat text-transparent [background-position:0_0] [background-size:100px_100%]"
                style={{ "--shimmer-width": "100px" } as React.CSSProperties}
              >
                Agentic Workflow for Product Optimization
              </span>
            </GradientButton>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Rank #1 on Google, Amazon & AI Search with{" "}
            <AuroraText>
              <span className="text-primary">AI Agents</span>
            </AuroraText>{" "}
            Working 24/7
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl">
            Deploy specialized AI agents that automate competitor research, keyword discovery, content creation, and
            listing optimization across Google Shopping, Amazon, Perplexity, and AI-powered search engines. Scale your
            e-commerce business while you sleep.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/login?callbackUrl=/dashboard">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto" asChild>
              <Link href="/demo">
                <Eye className="mr-2 h-5 w-5" />
                See Demo
              </Link>
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

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border-4 border-primary/30 bg-muted shadow-2xl ring-4 ring-primary/10">
            <Image src="/images/image.png" alt="InstaRank Dashboard Preview" fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
