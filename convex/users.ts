import { query, internalMutation, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const currentLoggedInUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user: Doc<"users"> | null = await ctx.db.get(userId);
    return user;
  },
});

// Auto-promote authorized admin user
export const autoPromoteAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { success: false, message: "Not authenticated" };
    
    const user = await ctx.db.get(userId);
    if (!user) return { success: false, message: "User not found" };
    
    // Only promote the specific authorized email
    if (user.email === "elevenshirt2025@gmail.com" && user.role !== "admin") {
      await ctx.db.patch(userId, {
        role: "admin",
        name: "ElevenShirt Admin"
      });
      return { success: true, message: "Admin role granted" };
    }
    
    return { success: false, message: "Not authorized for admin role" };
  },
});