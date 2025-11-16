// Mock data for demo dashboard - no database required
export const demoUser = {
  id: "demo-user-123",
  name: "Alex Gul",
  email: "demo@instarank.ai",
  subscriptionStatus: "trial" as const,
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
}

export const demoStats = {
  stores: 2,
  products: 8,
  keywords: 247,
  content: 15,
}

export const demoStores = [
  {
    id: "store-1",
    name: "Premium Home Goods",
    marketplace: "US",
    status: "active",
    productsCount: 5,
  },
  {
    id: "store-2",
    name: "Outdoor Adventure Gear",
    marketplace: "US",
    status: "active",
    productsCount: 3,
  },
]

export const demoProducts = [
  {
    id: "prod-1",
    title: "Stainless Steel Water Bottle - 32oz Insulated",
    asin: "B08XYZ1234",
    storeName: "Outdoor Adventure Gear",
    currentRank: 15,
    targetRank: 5,
    status: "optimizing",
    lastOptimized: "2 hours ago",
  },
  {
    id: "prod-2",
    title: "Premium Yoga Mat - Non-Slip Extra Thick",
    asin: "B08ABC5678",
    storeName: "Premium Home Goods",
    currentRank: 8,
    targetRank: 3,
    status: "active",
    lastOptimized: "5 hours ago",
  },
  {
    id: "prod-3",
    title: "LED Camping Lantern - Rechargeable",
    asin: "B08DEF9012",
    storeName: "Outdoor Adventure Gear",
    currentRank: 23,
    targetRank: 10,
    status: "monitoring",
    lastOptimized: "1 day ago",
  },
]

export const demoCompetitors = [
  {
    id: "comp-1",
    productTitle: "Stainless Steel Water Bottle - 32oz Insulated",
    competitorAsin: "B07ABC1234",
    competitorTitle: "HydroFlask Style Water Bottle - 32oz",
    rank: 3,
    price: 24.99,
    reviews: 4587,
    rating: 4.7,
  },
  {
    id: "comp-2",
    productTitle: "Premium Yoga Mat - Non-Slip Extra Thick",
    competitorAsin: "B07DEF5678",
    competitorTitle: "Professional Yoga Mat - Premium Quality",
    rank: 2,
    price: 39.99,
    reviews: 3241,
    rating: 4.8,
  },
]

export const demoKeywords = [
  {
    id: "kw-1",
    keyword: "insulated water bottle",
    searchVolume: 45000,
    difficulty: 68,
    relevance: 95,
    currentRank: 15,
    status: "targeting",
  },
  {
    id: "kw-2",
    keyword: "stainless steel bottle",
    searchVolume: 32000,
    difficulty: 72,
    relevance: 92,
    currentRank: 22,
    status: "monitoring",
  },
  {
    id: "kw-3",
    keyword: "yoga mat non slip",
    searchVolume: 38000,
    difficulty: 65,
    relevance: 98,
    currentRank: 8,
    status: "ranking",
  },
]

export const demoContent = [
  {
    id: "content-1",
    type: "Product Title",
    product: "Stainless Steel Water Bottle",
    generatedAt: "2024-01-15",
    status: "approved",
  },
  {
    id: "content-2",
    type: "Bullet Points",
    product: "Premium Yoga Mat",
    generatedAt: "2024-01-14",
    status: "pending",
  },
  {
    id: "content-3",
    type: "Product Description",
    product: "LED Camping Lantern",
    generatedAt: "2024-01-14",
    status: "approved",
  },
]

export const demoRecentActivity = [
  {
    id: "act-1",
    action: "Keyword discovered",
    description: "Found 47 new high-value keywords for Water Bottle",
    timestamp: "2 hours ago",
    icon: "search",
  },
  {
    id: "act-2",
    action: "Content generated",
    description: "Created optimized product description for Yoga Mat",
    timestamp: "5 hours ago",
    icon: "file",
  },
  {
    id: "act-3",
    action: "Rank improved",
    description: "Water Bottle moved from #23 to #15",
    timestamp: "1 day ago",
    icon: "trending",
  },
]

export const demoAnalytics = {
  salesIncrease: 56,
  timeSaved: 18,
  keywordsRanked: 142,
  contentGenerated: 15,
  weeklyData: [
    { week: "Week 1", sales: 2400, keywords: 35 },
    { week: "Week 2", sales: 3200, keywords: 58 },
    { week: "Week 3", sales: 4100, keywords: 89 },
    { week: "Week 4", sales: 5300, keywords: 142 },
  ],
}
