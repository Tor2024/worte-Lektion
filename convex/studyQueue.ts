import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getStudyQueue = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("study_queue")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const setStudyQueue = mutation({
    args: {
        userId: v.string(),
        items: v.array(v.any()), // Array of StudyQueueItem
    },
    handler: async (ctx, args) => {
        const { userId, items } = args;

        // Delete existing to sync
        const existing = await ctx.db
            .query("study_queue")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();

        for (const item of existing) {
            await ctx.db.delete(item._id);
        }

        // Insert new
        for (const item of items) {
            await ctx.db.insert("study_queue", {
                userId,
                itemId: item.id,
                status: item.status,
                currentStage: item.currentStage,
                nextReviewNum: item.nextReviewNum,
                lastUpdated: Date.now(),
                details: item,
            });
        }
    },
});

export const updateItemStatus = mutation({
    args: {
        userId: v.string(),
        itemId: v.string(),
        status: v.string(),
        nextReviewNum: v.number(),
        details: v.any(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("study_queue")
            .withIndex("by_user_item", (q) => q.eq("userId", args.userId).eq("itemId", args.itemId))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, {
                status: args.status,
                nextReviewNum: args.nextReviewNum,
                lastUpdated: Date.now(),
                details: args.details,
            });
        } else {
            await ctx.db.insert("study_queue", {
                userId: args.userId,
                itemId: args.itemId,
                status: args.status,
                currentStage: "priming",
                nextReviewNum: args.nextReviewNum,
                lastUpdated: Date.now(),
                details: args.details,
            });
        }
    },
});
