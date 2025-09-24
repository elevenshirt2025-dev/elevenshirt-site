import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// Public query to get all published articles for the blog
export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("articles")
      .withIndex("published", (q) => q.eq("published", true))
      .order("desc")
      .collect();
    
    // Get author info for each article
    const articlesWithAuthors = await Promise.all(
      articles.map(async (article) => {
        const author = await ctx.db.get(article.authorId);
        return {
          ...article,
          author: author ? { name: author.name || "Anonymous" } : { name: "Anonymous" }
        };
      })
    );
    
    return articlesWithAuthors;
  },
});

// Public query to get a single published article by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const article = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", slug))
      .filter((q) => q.eq(q.field("published"), true))
      .first();
    
    if (!article) return null;
    
    const author = await ctx.db.get(article.authorId);
    return {
      ...article,
      author: author ? { name: author.name || "Anonymous" } : { name: "Anonymous" }
    };
  },
});

// Admin query to get all articles (published and unpublished)
type GetAllForAdminResult =
  | { ok: true; articles: (Doc<"articles"> & { author: { name: string } })[] }
  | { ok: false; code: "FORBIDDEN"; message: string };

export const getAllForAdmin = query({
  args: {},
  handler: async (ctx): Promise<GetAllForAdminResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "You must be an admin to view these articles." };
    }

    const articles = await ctx.db.query("articles").order("desc").collect();
    
    // Get author info for each article
    const articlesWithAuthors = await Promise.all(
      articles.map(async (article) => {
        const author = await ctx.db.get(article.authorId);
        return {
          ...article,
          author: author ? { name: author.name || "Anonymous" } : { name: "Anonymous" }
        };
      })
    );
    
    return { ok: true, articles: articlesWithAuthors };
  },
});

// Admin mutation to create a new article
type CreateArticleResult =
  | { ok: true; articleId: string }
  | { ok: false; code: "FORBIDDEN" | "VALIDATION_ERROR"; message: string };

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args): Promise<CreateArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "You must be an admin to create articles." };
    }

    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { ok: false, code: "FORBIDDEN", message: "You must be logged in." };
    }

    // Check if slug already exists
    const existingArticle = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (existingArticle) {
      return { ok: false, code: "VALIDATION_ERROR", message: "An article with this slug already exists." };
    }

    const now = Date.now();
    const articleId = await ctx.db.insert("articles", {
      ...args,
      authorId: userId,
      createdAt: now,
      updatedAt: now,
    });

    return { ok: true, articleId };
  },
});

// Admin mutation to update an article
type UpdateArticleResult =
  | { ok: true }
  | { ok: false; code: "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR"; message: string };

export const update = mutation({
  args: {
    id: v.id("articles"),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args): Promise<UpdateArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "You must be an admin to update articles." };
    }

    const article = await ctx.db.get(args.id);
    if (!article) {
      return { ok: false, code: "NOT_FOUND", message: "Article not found." };
    }

    // Check if slug already exists (excluding current article)
    const existingArticle = await ctx.db
      .query("articles")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.neq(q.field("_id"), args.id))
      .first();
    
    if (existingArticle) {
      return { ok: false, code: "VALIDATION_ERROR", message: "An article with this slug already exists." };
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      published: args.published,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

// Admin mutation to delete an article
type DeleteArticleResult =
  | { ok: true }
  | { ok: false; code: "FORBIDDEN" | "NOT_FOUND"; message: string };

export const deleteArticle = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }): Promise<DeleteArticleResult> => {
    const isUserAdmin: boolean = await ctx.runQuery(api.authz.isAdmin, {});
    
    if (!isUserAdmin) {
      return { ok: false, code: "FORBIDDEN", message: "You must be an admin to delete articles." };
    }

    const article = await ctx.db.get(id);
    if (!article) {
      return { ok: false, code: "NOT_FOUND", message: "Article not found." };
    }

    await ctx.db.delete(id);
    return { ok: true };
  },
});