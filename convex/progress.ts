import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// --- PROGRESS ---
export const getProgress = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("user_progress")
            .withIndex("by_user_topic", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const updateProgress = mutation({
    args: {
        userId: v.string(),
        topicId: v.string(),
        proficiency: v.number()
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("user_progress")
            .withIndex("by_user_topic", (q) => q.eq("userId", args.userId).eq("topicId", args.topicId))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, { proficiency: args.proficiency });
        } else {
            await ctx.db.insert("user_progress", {
                userId: args.userId,
                topicId: args.topicId,
                proficiency: args.proficiency,
            });
        }
    },
});

// --- SRS DATA ---
export const getSRS = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("srs_data")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();
    },
});

export const updateSRS = mutation({
    args: {
        userId: v.string(),
        wordId: v.string(),
        state: v.object({
            interval: v.number(),
            repetitions: v.number(),
            easeFactor: v.number(),
            nextReviewDate: v.optional(v.number()),
            step: v.optional(v.number()),
        }),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("srs_data")
            .withIndex("by_user_word", (q) => q.eq("userId", args.userId).eq("wordId", args.wordId))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, { ...args.state });
        } else {
            await ctx.db.insert("srs_data", {
                userId: args.userId,
                wordId: args.wordId,
                ...args.state,
            });
        }
    },
});

// --- FOLDERS & WORDS ---
export const getFoldersWithWords = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const folders = await ctx.db
            .query("folders")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();

        const result = [];
        for (const folder of folders) {
            const words = await ctx.db
                .query("words")
                .withIndex("by_folder", (q) => q.eq("folderId", folder._id))
                .collect();
            result.push({ ...folder, words });
        }
        return result;
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

export const addWordToFolder = mutation({
    args: {
        folderId: v.id("folders"),
        userId: v.string(),
        word: v.any(), // VocabularyWord
        sm2State: v.any(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("words", {
            folderId: args.folderId,
            userId: args.userId,
            german: args.word.german,
            russian: args.word.russian,
            type: args.word.type,
            details: args.word,
            sm2State: args.sm2State,
            addedAt: Date.now(),
        });
    },
});
