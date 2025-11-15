import { Search, Sparkles, FileText, Share2, BarChart, Shield } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Competitive Intelligence",
    description:
      "Track competitor prices, rankings, and strategies. Reverse ASIN lookup reveals their keyword secrets.",
  },
  {
    icon: Sparkles,
    title: "AI Keyword Discovery",
    description: "Find high-volume, low-competition keywords. Optimize backend search terms to maximize visibility.",
  },
  {
    icon: FileText,
    title: "SEO Content Generation",
    description: "AI-generated titles, bullets, and A+ Content optimized for Amazon's A9 algorithm and conversions.",
  },
  {
    icon: Share2,
    title: "Social Media Automation",
    description: "Schedule posts across Facebook, Instagram, TikTok, and LinkedIn. AI-generated captions and hashtags.",
  },
  {
    icon: BarChart,
    title: "Content Marketing",
    description: "Auto-generate SEO blog posts, product comparisons, and guides. WordPress integration included.",
  },
  {
    icon: Shield,
    title: "Compliance-First",
    description: "Ethical data collection using Amazon SP-API and public data. GDPR and privacy law compliant.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything You Need to Dominate Your Niche
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            From competitor research to content creation, InstaRank automates your entire Amazon optimization workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
