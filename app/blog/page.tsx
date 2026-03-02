import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "How AI Agents Are Revolutionizing E-commerce SEO",
      excerpt:
        "Learn how AI-powered automation is helping sellers rank higher on Google, Amazon, and AI search engines.",
      category: "AI & Automation",
      date: "December 15, 2024",
      slug: "ai-agents-ecommerce-seo",
    },
    {
      title: "10 Strategies to Rank #1 on Google Shopping",
      excerpt: "Discover proven tactics to optimize your product listings and dominate Google Shopping results.",
      category: "SEO Strategy",
      date: "December 10, 2024",
      slug: "google-shopping-strategies",
    },
    {
      title: "Perplexity AI Search: The Next Frontier for E-commerce",
      excerpt: "Why AI-powered search engines matter and how to optimize your products for them.",
      category: "Trends",
      date: "December 5, 2024",
      slug: "perplexity-ai-search",
    },
    {
      title: "Amazon Listing Optimization: Complete Guide for 2024",
      excerpt: "Everything you need to know about optimizing your Amazon product listings for maximum visibility.",
      category: "Amazon",
      date: "November 28, 2024",
      slug: "amazon-listing-optimization",
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
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Expert insights on e-commerce optimization, AI automation, and ranking strategies.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <CardTitle className="hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/blog/${post.slug}`}>Read more →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
