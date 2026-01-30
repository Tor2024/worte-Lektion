import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getExamTexts = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("exam_texts")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const addExamText = mutation({
    args: {
        userId: v.string(),
        title: v.string(),
        description: v.string(),
        level: v.string(),
        content: v.string(),
        isCustom: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("exam_texts", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const deleteExamText = mutation({
    args: { id: v.id("exam_texts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
