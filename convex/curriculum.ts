import { v } from "convex/values";
import { query } from "./_generated/server";

export const getLevels = query({
    args: {},
    handler: async (ctx) => {
        // Fetch all levels
        // In a real app we might want to sort by 'order'. 
        // Since we don't have specific sort syntax in 'collect' without an index, 
        // we can sort in JS or add an index on 'order'.
        // For now, let's just return them.
        const levels = await ctx.db.query("curriculum_levels").collect();
        return levels.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
});

export const getLevel = query({
    args: { levelId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("curriculum_levels")
            .withIndex("by_level_id", q => q.eq("id", args.levelId))
            .first();
    }
});

export const getTopics = query({
    args: { levelId: v.string() },
    handler: async (ctx, args) => {
        const topics = await ctx.db.query("curriculum_topics")
            .withIndex("by_level", q => q.eq("levelId", args.levelId))
            .collect();
        return topics.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
});

export const getTopic = query({
    args: { levelId: v.string(), topicId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("curriculum_topics")
            .withIndex("by_level_id", q => q.eq("levelId", args.levelId).eq("id", args.topicId))
            .first();
    }
});
// ... existing code ...

export const getAllTopics = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("curriculum_topics").collect();
    }
});
