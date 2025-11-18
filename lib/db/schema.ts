import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  uuid,
  varchar,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  passwordHash: text("password_hash"),
  image: text("image"),
  emailVerified: timestamp("email_verified"),
  subscriptionTier: varchar("subscription_tier", { length: 50 }).default("starter"), // free, starter, growth, professional, enterprise
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default("trial"), // active, inactive, cancelled, past_due, trial
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({ columns: [table.provider, table.providerAccountId] }),
  }),
)

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Amazon stores
export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  marketplace: varchar("marketplace", { length: 50 }).default("US"), // US, UK, CA, etc.
  sellerId: varchar("seller_id", { length: 255 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Products
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id")
    .references(() => stores.id, { onDelete: "cascade" })
    .notNull(),
  asin: varchar("asin", { length: 20 }).notNull(),
  title: text("title"),
  description: text("description"),
  bulletPoints: jsonb("bullet_points"), // array of strings
  price: decimal("price", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  reviewCount: integer("review_count").default(0),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 255 }),
  rank: integer("rank"),
  isActive: boolean("is_active").default(true),
  lastScrapedAt: timestamp("last_scraped_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Competitors
export const competitors = pgTable("competitors", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  asin: varchar("asin", { length: 20 }).notNull(),
  title: text("title"),
  price: decimal("price", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  reviewCount: integer("review_count").default(0),
  rank: integer("rank"),
  imageUrl: text("image_url"),
  lastScrapedAt: timestamp("last_scraped_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Keywords
export const keywords = pgTable("keywords", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  searchVolume: integer("search_volume"),
  competition: varchar("competition", { length: 50 }), // low, medium, high
  effectivenessScore: integer("effectiveness_score"), // 0-100
  isUsed: boolean("is_used").default(false),
  position: integer("position"), // ranking position for this keyword
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// AI Generated Content
export const generatedContent = pgTable("generated_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  contentType: varchar("content_type", { length: 50 }).notNull(), // listing, blog, social, a_plus
  title: text("title"),
  content: text("content").notNull(),
  metadata: jsonb("metadata"), // additional data like keywords used, platform, etc.
  status: varchar("status", { length: 50 }).default("draft"), // draft, published, scheduled
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Social Media Accounts
export const socialAccounts = pgTable("social_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  platform: varchar("platform", { length: 50 }).notNull(), // facebook, instagram, tiktok, linkedin, twitter
  accountName: varchar("account_name", { length: 255 }),
  accessToken: text("access_token"), // encrypted
  refreshToken: text("refresh_token"), // encrypted
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Usage tracking for billing
export const usageTracking = pgTable("usage_tracking", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  month: varchar("month", { length: 7 }).notNull(), // YYYY-MM format
  keywordSearches: integer("keyword_searches").default(0),
  aiListingsGenerated: integer("ai_listings_generated").default(0),
  blogPostsGenerated: integer("blog_posts_generated").default(0),
  socialPostsScheduled: integer("social_posts_scheduled").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Analytics and tracking tables
export const rankHistory = pgTable("rank_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  rank: integer("rank").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const salesData = pgTable("sales_data", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  estimatedSales: integer("estimated_sales"),
  revenue: decimal("revenue", { precision: 12, scale: 2 }),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const keywordRankings = pgTable("keyword_rankings", {
  id: uuid("id").defaultRandom().primaryKey(),
  keywordId: uuid("keyword_id")
    .references(() => keywords.id, { onDelete: "cascade" })
    .notNull(),
  position: integer("position").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const aiAgentRuns = pgTable("ai_agent_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  agentType: varchar("agent_type", { length: 50 }).notNull(), // competitor, keyword, content, social, analytics
  status: varchar("status", { length: 50 }).default("running"), // running, completed, failed
  inputData: jsonb("input_data"),
  outputData: jsonb("output_data"),
  errorMessage: text("error_message"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  stores: many(stores),
  generatedContent: many(generatedContent),
  socialAccounts: many(socialAccounts),
  usageTracking: many(usageTracking),
  accounts: many(accounts),
  sessions: many(sessions),
}))

export const storesRelations = relations(stores, ({ one, many }) => ({
  user: one(users, {
    fields: [stores.userId],
    references: [users.id],
  }),
  products: many(products),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  competitors: many(competitors),
  keywords: many(keywords),
  generatedContent: many(generatedContent),
  rankHistory: many(rankHistory),
  salesData: many(salesData),
}))

export const competitorsRelations = relations(competitors, ({ one }) => ({
  product: one(products, {
    fields: [competitors.productId],
    references: [products.id],
  }),
}))

export const keywordsRelations = relations(keywords, ({ one }) => ({
  product: one(products, {
    fields: [keywords.productId],
    references: [products.id],
  }),
  keywordRankings: many(keywordRankings),
}))

export const generatedContentRelations = relations(generatedContent, ({ one }) => ({
  product: one(products, {
    fields: [generatedContent.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [generatedContent.userId],
    references: [users.id],
  }),
}))

export const socialAccountsRelations = relations(socialAccounts, ({ one }) => ({
  user: one(users, {
    fields: [socialAccounts.userId],
    references: [users.id],
  }),
}))

export const usageTrackingRelations = relations(usageTracking, ({ one }) => ({
  user: one(users, {
    fields: [usageTracking.userId],
    references: [users.id],
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const rankHistoryRelations = relations(rankHistory, ({ one }) => ({
  product: one(products, {
    fields: [rankHistory.productId],
    references: [products.id],
  }),
}))

export const salesDataRelations = relations(salesData, ({ one }) => ({
  product: one(products, {
    fields: [salesData.productId],
    references: [products.id],
  }),
}))

export const keywordRankingsRelations = relations(keywordRankings, ({ one }) => ({
  keyword: one(keywords, {
    fields: [keywordRankings.keywordId],
    references: [keywords.id],
  }),
}))

export const aiAgentRunsRelations = relations(aiAgentRuns, ({ one }) => ({
  user: one(users, {
    fields: [aiAgentRuns.userId],
    references: [users.id],
  }),
}))
