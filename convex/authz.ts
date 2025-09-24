import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    
    // Auto-grant admin access to the user's email
    if (user?.email === "elevenshirt2025@gmail.com") { // User's email from user info
      return true;
    }
    
    return !!user && user.role === "admin";
  },
});

export const isAuthenticated = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return !!userId;
  },
});