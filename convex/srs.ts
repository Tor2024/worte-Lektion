import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const srs = await ctx.db
            .query("srs_data")
            .withIndex("by_user_word", (q) => q.eq("userId", args.userId))
            .collect();
        return srs;
    },
});

export const update = mutation({
    args: {
        userId: v.string(),
        wordId: v.string(),
        interval: v.number(),
        repetitions: v.number(),
        easeFactor: v.number(),
        nextReviewDate: v.optional(v.number()),
        step: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { userId, wordId, ...state } = args;
        const existing = await ctx.db
            .query("srs_data")
            .withIndex("by_user_word", (q) => q.eq("userId", userId).eq("wordId", wordId))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, state);
        } else {
            await ctx.db.insert("srs_data", { userId, wordId, ...state });
        }
    },
});
