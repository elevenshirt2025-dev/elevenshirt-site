import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()), // "admin" or undefined for regular users
  }).index("email", ["email"]), // CRITICAL: Index on email for user lookups
  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    published: v.boolean(),
    authorId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("slug", ["slug"]) // For URL routing
    .index("published", ["published"]) // For filtering published articles
    .index("author", ["authorId"]), // For author-based queries
  club_exclusions: defineTable({
    customerName: v.string(),
    customerEmail: v.string(),
    excludedClubs: v.string(), // Comma-separated list of clubs
    orderDetails: v.string(), // JSON string with cart items and customer info
    createdAt: v.number(),
    status: v.optional(v.union(v.literal("pending"), v.literal("sent"), v.literal("failed"))),
  }),
})