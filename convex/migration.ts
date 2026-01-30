import { v, ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

export const migrateFromLocalStorage = mutation({
    args: {
        userId: v.string(),
        progress: v.array(v.object({ topicId: v.string(), proficiency: v.number() })),
        srs: v.array(v.object({ wordId: v.string(), state: v.any() })),
        folders: v.any(),
    },
    handler: async (ctx, args) => {
        try {
            // Helper to sanitize SM2 state for Convex (removes nulls and extra fields)
            const sanitizeSM2 = (state: any) => {
                if (!state || typeof state !== 'object') return null;
                return {
                    interval: typeof state.interval === 'number' ? state.interval : 0,
                    repetitions: typeof state.repetitions === 'number' ? state.repetitions : 0,
                    easeFactor: typeof state.easeFactor === 'number' ? state.easeFactor : 2.5,
                    nextReviewDate: typeof state.nextReviewDate === 'number' ? state.nextReviewDate : undefined,
                    step: typeof state.step === 'number' ? state.step : undefined,
                };
            };

            // 1. Migrate Progress
            for (const item of args.progress) {
                const { topicId, proficiency } = item;
                const existing = await ctx.db
                    .query("user_progress")
                    .withIndex("by_user_topic", (q) => q.eq("userId", args.userId).eq("topicId", topicId))
                    .unique();
                if (!existing) {
                    await ctx.db.insert("user_progress", { userId: args.userId, topicId, proficiency: proficiency || 0 });
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
                    const cleanState = sanitizeSM2(state);
                    if (cleanState) {
                        await ctx.db.insert("srs_data", {
                            userId: args.userId,
                            wordId,
                            ...cleanState
                        });
                    }
                }
            }

            // 3. Migrate Folders & Words
            const folders = Array.isArray(args.folders) ? args.folders : [];
            for (const folder of folders) {
                const existingFolder = await ctx.db
                    .query("folders")
                    .withIndex("by_user_name", (q) =>
                        q.eq("userId", args.userId).eq("name", folder.name || "Unnamed Folder")
                    )
                    .unique();

                let folderId;
                if (!existingFolder) {
                    folderId = await ctx.db.insert("folders", {
                        userId: args.userId,
                        name: folder.name || "Unnamed Folder",
                        createdAt: folder.createdAt || Date.now(),
                    });
                } else {
                    folderId = existingFolder._id;
                }

                const folderWords = Array.isArray(folder.words) ? folder.words : [];
                for (const word of folderWords) {
                    const wordData = word.word || word;
                    if (!wordData?.german) continue;

                    const existingWord = await ctx.db
                        .query("words")
                        .withIndex("by_folder_german", (q) =>
                            q.eq("folderId", folderId).eq("german", wordData.german)
                        )
                        .unique();

                    if (!existingWord) {
                        await ctx.db.insert("words", {
                            folderId,
                            userId: args.userId,
                            german: wordData.german,
                            russian: wordData.russian || "",
                            type: wordData.type || "other",
                            details: wordData,
                            sm2State: sanitizeSM2(word.sm2State) || {},
                            addedAt: word.addedAt || Date.now(),
                        });
                    }
                }
            }

            return { success: true };
        } catch (error: any) {
            console.error("Migration error details:", error);
            // Using ConvexError allows the client to see the actual error message
            throw new ConvexError(`Data Migration Failed: ${error.message}`);
        }
    },
});
