import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getFolders = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const folders = await ctx.db
            .query("folders")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();

        const foldersWithWords = await Promise.all(
            folders.map(async (f) => {
                const words = await ctx.db
                    .query("words")
                    .withIndex("by_folder", (q) => q.eq("folderId", f._id))
                    .collect();
                return { ...f, words };
            })
        );

        return foldersWithWords;
    },
});

export const createFolder = mutation({
    args: { userId: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.insert("folders", {
            userId: args.userId,
            name: args.name,
            createdAt: Date.now(),
        });
    },
});

export const deleteFolder = mutation({
    args: { folderId: v.id("folders") },
    handler: async (ctx, args) => {
        const words = await ctx.db
            .query("words")
            .withIndex("by_folder", (q) => q.eq("folderId", args.folderId))
            .collect();
        for (const w of words) {
            await ctx.db.delete(w._id);
        }
        await ctx.db.delete(args.folderId);
    },
});

export const addWord = mutation({
    args: {
        folderId: v.id("folders"),
        userId: v.string(),
        german: v.string(),
        russian: v.string(),
        type: v.string(),
        details: v.any(),
        sm2State: v.any(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("words", {
            ...args,
            addedAt: Date.now(),
        });
    },
});

export const updateWord = mutation({
    args: {
        wordId: v.id("words"),
        german: v.optional(v.string()),
        russian: v.optional(v.string()),
        sm2State: v.optional(v.any()),
        details: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const { wordId, ...updates } = args;
        await ctx.db.patch(wordId, updates);
    },
});

export const deleteWord = mutation({
    args: { wordId: v.id("words") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.wordId);
    },
});
