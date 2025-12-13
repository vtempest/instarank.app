import { ApiReference } from "@scalar/api-reference"
import { openApiSpec } from "@/lib/openapi-spec"

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
