import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SessionProvider } from "@/components/auth/session-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "InstaRank - E-commerce Growth Platform",
  description:
    "Boost your e-commerce sales with AI-powered competitor analysis, SEO optimization, and social media management.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/logo-instarank.png",
        type: "image/png",
      },
    ],
    apple: "/images/logo-instarank.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SessionProvider>{children}</SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
