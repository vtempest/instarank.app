# InstaRank API Documentation

## Authentication
All API endpoints require authentication via session cookies. Include the session cookie in requests.

## Base URL
`/api`

## Endpoints

### Stores

#### GET /api/stores
Get all stores for the authenticated user.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
\`\`\`json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
\`\`\`

#### POST /api/stores
Create a new store.

**Body:**
\`\`\`json
{
  "name": "My Amazon Store",
  "marketplace": "US",
  "sellerId": "A1B2C3D4E5F6G"
}
\`\`\`

#### GET /api/stores/[id]
Get a specific store with all products.

#### PATCH /api/stores/[id]
Update a store.

#### DELETE /api/stores/[id]
Delete a store.

### Products

#### GET /api/products
Get all products for the authenticated user.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `storeId` (optional): Filter by store

#### POST /api/products
Create a new product.

**Body:**
\`\`\`json
{
  "storeId": "uuid",
  "asin": "B08N5WRWNW",
  "title": "Product Title",
  "description": "Description",
  "bulletPoints": ["Point 1", "Point 2"],
  "price": "29.99",
  "imageUrl": "https://...",
  "category": "Electronics"
}
\`\`\`

#### GET /api/products/[id]
Get product details with competitors and keywords.

#### PATCH /api/products/[id]
Update a product.

#### DELETE /api/products/[id]
Delete a product.

### Competitors

#### GET /api/competitors
Get competitors for a product.

**Query Parameters:**
- `productId` (required): Product UUID
- `page`, `limit`: Pagination

#### POST /api/competitors
Add a competitor.

### Keywords

#### GET /api/keywords
Get keywords for a product.

**Query Parameters:**
- `productId` (required): Product UUID
- `page`, `limit`: Pagination

#### POST /api/keywords
Add a keyword.

### Analytics

#### GET /api/analytics/rank-history
Get rank history for a product.

**Query Parameters:**
- `productId` (required)
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

#### POST /api/analytics/rank-history
Record rank data.

#### GET /api/analytics/sales
Get sales data for a product.

#### POST /api/analytics/sales
Record sales data.

## Error Responses

All errors follow this format:
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "errors": {} // Optional validation errors
}
\`\`\`

## Rate Limiting
- 100 requests per minute per user
- 1000 requests per hour per user
