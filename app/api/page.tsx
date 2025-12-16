"use client"

import dynamic from "next/dynamic"
import { openApiSpec } from "@/lib/openapi-spec"

// Dynamically import ApiReference with no SSR to prevent build errors
const ApiReference = dynamic(
  () => import("@scalar/api-reference").then((mod) => mod.ApiReference),
  { ssr: false }
)

export default function ApiDocsPage() {
  return (
    <ApiReference
      configuration={{
        spec: {
          content: openApiSpec,
        },
        theme: "purple",
        layout: "modern",
        defaultHttpClient: {
          targetKey: "javascript",
          clientKey: "fetch",
        },
        authentication: {
          preferredSecurityScheme: "cookieAuth",
        },
        servers: [
          {
            url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            description: "Current server",
          },
        ],
      }}
    />
  )
}
