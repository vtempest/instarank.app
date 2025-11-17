import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from 'lucide-react'
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary to-primary-hover p-8 text-center md:p-12">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to Transform Your Amazon Business?
          </h2>
          <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
            Join thousands of sellers who are saving time and increasing sales with InstaRank. Explore our AI-powered platform with an interactive demo.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href="/login?callbackUrl=/dashboard">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-2 border-white bg-transparent text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="/demo">
                <Eye className="mr-2 h-5 w-5" />
                See Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
