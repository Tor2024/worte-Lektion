import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const progress = await ctx.db
            .query("user_progress")
            .withIndex("by_user_topic", (q) => q.eq("userId", args.userId))
            .collect();
        return progress;
    },
});

export const update = mutation({
    args: {
        userId: v.string(),
        topicId: v.string(),
        proficiency: v.number(),
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
