import type { OpenAPIObject } from "openapi3-ts/oas31"

export const openApiSpec: OpenAPIObject = {
  openapi: "3.1.0",
  info: {
    title: "InstaRank API",
    version: "1.0.0",
    description: "API for InstaRank - Amazon Seller Analytics & AI Content Platform",
    contact: {
      name: "InstaRank Support",
      email: "support@instarank.com",
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User authentication and session management",
    },
    {
      name: "Stores",
      description: "Amazon store management",
    },
    {
      name: "Products",
      description: "Product catalog management",
    },
    {
      name: "Competitors",
      description: "Competitor tracking and analysis",
    },
    {
      name: "Keywords",
      description: "Keyword research and tracking",
    },
    {
      name: "Analytics",
      description: "Sales and ranking analytics",
    },
  ],
  paths: {
    "/api/auth/sign-in": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully authenticated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    session: { $ref: "#/components/schemas/Session" },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/stores": {
      get: {
        tags: ["Stores"],
        summary: "Get all stores for the authenticated user",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10 },
          },
        ],
        responses: {
          "200": {
            description: "List of stores",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Store" },
                    },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        tags: ["Stores"],
        summary: "Create a new store",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  marketplace: { type: "string", default: "US" },
                  sellerId: { type: "string" },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Store created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Store" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/stores/{id}": {
      get: {
        tags: ["Stores"],
        summary: "Get a specific store",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Store details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Store" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "Get all products",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10 },
          },
          {
            name: "storeId",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "List of products",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a new product",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  storeId: { type: "string", format: "uuid" },
                  asin: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  bulletPoints: { type: "array", items: { type: "string" } },
                  price: { type: "number" },
                  imageUrl: { type: "string", format: "uri" },
                  category: { type: "string" },
                },
                required: ["storeId", "asin"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
        },
      },
    },
    "/api/competitors": {
      get: {
        tags: ["Competitors"],
        summary: "Get all competitors",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "List of competitors",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Competitor" },
                },
              },
            },
          },
        },
      },
    },
    "/api/keywords": {
      get: {
        tags: ["Keywords"],
        summary: "Get keywords for a product",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "List of keywords",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Keyword" },
                },
              },
            },
          },
        },
      },
    },
    "/api/analytics/rank-history": {
      get: {
        tags: ["Analytics"],
        summary: "Get rank history for a product",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "query",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Rank history data",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/RankHistory" },
                },
              },
            },
          },
        },
      },
    },
    "/api/analytics/sales": {
      get: {
        tags: ["Analytics"],
        summary: "Get sales data for a product",
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: "productId",
            in: "query",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Sales data",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/SalesData" },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "better-auth.session_token",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string", format: "email" },
          name: { type: "string" },
          image: { type: "string", format: "uri" },
          subscriptionTier: {
            type: "string",
            enum: ["starter", "growth", "professional", "enterprise"],
          },
          subscriptionStatus: {
            type: "string",
            enum: ["active", "inactive", "cancelled", "past_due", "trial"],
          },
        },
      },
      Session: {
        type: "object",
        properties: {
          sessionToken: { type: "string" },
          userId: { type: "string", format: "uuid" },
          expires: { type: "string", format: "date-time" },
        },
      },
      Store: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          name: { type: "string" },
          marketplace: { type: "string" },
          sellerId: { type: "string" },
          isActive: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          storeId: { type: "string", format: "uuid" },
          asin: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          bulletPoints: { type: "array", items: { type: "string" } },
          price: { type: "number" },
          rating: { type: "number" },
          reviewCount: { type: "integer" },
          imageUrl: { type: "string", format: "uri" },
          category: { type: "string" },
          rank: { type: "integer" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Competitor: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productId: { type: "string", format: "uuid" },
          asin: { type: "string" },
          title: { type: "string" },
          price: { type: "number" },
          rating: { type: "number" },
          reviewCount: { type: "integer" },
          rank: { type: "integer" },
          imageUrl: { type: "string", format: "uri" },
        },
      },
      Keyword: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productId: { type: "string", format: "uuid" },
          keyword: { type: "string" },
          searchVolume: { type: "integer" },
          competition: {
            type: "string",
            enum: ["low", "medium", "high"],
          },
          effectivenessScore: { type: "integer", minimum: 0, maximum: 100 },
          position: { type: "integer" },
        },
      },
      RankHistory: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productId: { type: "string", format: "uuid" },
          rank: { type: "integer" },
          date: { type: "string", format: "date-time" },
        },
      },
      SalesData: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          productId: { type: "string", format: "uuid" },
          estimatedSales: { type: "integer" },
          revenue: { type: "number" },
          date: { type: "string", format: "date-time" },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          page: { type: "integer" },
          limit: { type: "integer" },
          total: { type: "integer" },
          totalPages: { type: "integer" },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
          message: { type: "string" },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Unauthorized - Invalid or missing authentication",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },
  },
}
