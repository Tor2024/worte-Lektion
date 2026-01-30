import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getKnownWords = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const list = await ctx.db
            .query("known_words")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
        return list.map(item => item.word);
    },
});

export const addKnownWord = mutation({
    args: { userId: v.string(), word: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("known_words")
            .withIndex("by_user_word", (q) => q.eq("userId", args.userId).eq("word", args.word))
            .unique();
        if (!existing) {
            await ctx.db.insert("known_words", {
                userId: args.userId,
                word: args.word,
                addedAt: Date.now(),
            });
        }
    },
});

export const removeKnownWord = mutation({
    args: { userId: v.string(), word: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("known_words")
            .withIndex("by_user_word", (q) => q.eq("userId", args.userId).eq("word", args.word))
            .unique();
        if (existing) {
            await ctx.db.delete(existing._id);
        }
    },
});
