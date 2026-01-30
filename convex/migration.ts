import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const migrateFromLocalStorage = mutation({
    args: {
        userId: v.string(),
        progress: v.array(v.object({ topicId: v.string(), proficiency: v.number() })),
        srs: v.array(v.object({ wordId: v.string(), state: v.any() })),
        folders: v.any(),
    },
    handler: async (ctx, args) => {
        // 1. Migrate Progress
        for (const item of args.progress) {
            const { topicId, proficiency } = item;
            const existing = await ctx.db
                .query("user_progress")
                .withIndex("by_user_topic", (q) => q.eq("userId", args.userId).eq("topicId", topicId))
                .unique();
            if (!existing) {
                await ctx.db.insert("user_progress", { userId: args.userId, topicId, proficiency });
            }
        }

        // 2. Migrate SRS
        for (const item of args.srs) {
            const { wordId, state } = item;
            const existing = await ctx.db
                .query("srs_data")
                .withIndex("by_user_word", (q) => q.eq("userId", args.userId).eq("wordId", wordId))
                .unique();
            if (!existing) {
                await ctx.db.insert("srs_data", { userId: args.userId, wordId, ...(state as any) });
            }
        }

        // 3. Migrate Folders & Words
        for (const folder of args.folders as any[]) {
            const existingFolder = await ctx.db
                .query("folders")
                .withIndex("by_user", (q) => q.eq("userId", args.userId))
                .filter((q) => q.eq(q.field("name"), folder.name))
                .unique();

            let folderId;
            if (!existingFolder) {
                folderId = await ctx.db.insert("folders", {
                    userId: args.userId,
                    name: folder.name,
                    createdAt: folder.createdAt || Date.now(),
                });
            } else {
                folderId = existingFolder._id;
            }

            for (const word of folder.words) {
                const existingWord = await ctx.db
                    .query("words")
                    .withIndex("by_folder", (q) => q.eq("folderId", folderId))
                    .filter((q) => q.eq(q.field("german"), word.word.german))
                    .unique();

                if (!existingWord) {
                    await ctx.db.insert("words", {
                        folderId,
                        userId: args.userId,
                        german: word.word.german,
                        russian: word.word.russian,
                        type: word.word.type,
                        details: word.word,
                        sm2State: word.sm2State,
                        addedAt: word.addedAt || Date.now(),
                    });
                }
            }
        }

        return { success: true };
    },
});
