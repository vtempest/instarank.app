export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    trialDays: 14,
    features: ["Up to 10 products", "Basic keyword research", "AI listing generation", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 79,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || "",
    trialDays: 14,
    features: [
      "Up to 50 products",
      "Advanced keyword research",
      "AI listing & blog generation",
      "Social media scheduling",
      "Priority support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 199,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || "",
    trialDays: 14,
    features: ["Unlimited products", "Advanced analytics", "White-label reports", "API access", "Dedicated support"],
  },
]

export type Plan = (typeof plans)[number]
