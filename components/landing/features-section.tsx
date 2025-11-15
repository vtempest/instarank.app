import { Search, Sparkles, FileText, Share2, BarChart, Brain } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: "Competitor Intelligence Agent",
    description:
      "AI agent monitors competitor prices, rankings, and strategies 24/7. Reverse ASIN lookup reveals their winning keywords automatically.",
    borderColor: "border-blue-500",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Keyword Discovery Agent",
    description: "Intelligent agent finds high-volume, low-competition keywords and optimizes backend search terms to maximize your visibility.",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    icon: FileText,
    title: "SEO Content Generator Agent",
    description: "AI writing agent creates SEO-optimized titles, bullets, and A+ Content tailored for Amazon's A9 algorithm and conversions.",
    borderColor: "border-green-500",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    icon: Share2,
    title: "Social Media Automation Agent",
    description: "Smart scheduling agent manages posts across Facebook, Instagram, TikTok, and LinkedIn with AI-generated captions and hashtags.",
    borderColor: "border-orange-500",
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    icon: BarChart,
    title: "Content Marketing Agent",
    description: "Blog writing agent auto-generates SEO blog posts, product comparisons, and buying guides with WordPress integration included.",
    borderColor: "border-pink-500",
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    icon: Brain,
    title: "Analytics Intelligence Agent",
    description: "AI analytics agent tracks performance metrics, identifies trends, and provides actionable insights to boost your Amazon sales.",
    borderColor: "border-cyan-500",
    bgColor: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Specialized AI Agents for Every Task
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Each AI agent is purpose-built to automate specific aspects of your Amazon business, working together to maximize your success.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-lg border-2 ${feature.borderColor} bg-background p-6 transition-all hover:shadow-xl hover:shadow-${feature.borderColor}/20`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} transition-transform group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
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
