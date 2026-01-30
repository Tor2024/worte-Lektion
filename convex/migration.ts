import { v, ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

export const migrateFromLocalStorage = mutation({
    args: {
        userId: v.string(),
        progress: v.array(v.object({ topicId: v.string(), proficiency: v.number() })),
        srs: v.array(v.object({ wordId: v.string(), state: v.any() })),
        folders: v.any(),
        examTexts: v.optional(v.array(v.any())),
        knownWords: v.optional(v.array(v.string())),
        studyQueue: v.optional(v.array(v.any())),
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

            // 4. Migrate Exam Texts
            const examTexts = Array.isArray(args.examTexts) ? args.examTexts : [];
            for (const text of examTexts) {
                const existing = await ctx.db
                    .query("exam_texts")
                    .withIndex("by_user", (q) => q.eq("userId", args.userId))
                    .collect();

                // Simple search by title to avoid duplicates
                if (!existing.some(e => e.title === text.title)) {
                    await ctx.db.insert("exam_texts", {
                        userId: args.userId,
                        title: text.title,
                        description: text.description || "",
                        level: text.level || "B2",
                        content: text.content || "",
                        isCustom: true,
                        createdAt: text.createdAt || Date.now(),
                    });
                }
            }

            // 5. Migrate Known Words
            const knownWords = Array.isArray(args.knownWords) ? args.knownWords : [];
            for (const word of knownWords) {
                const existing = await ctx.db
                    .query("known_words")
                    .withIndex("by_user_word", (q) => q.eq("userId", args.userId).eq("word", word))
                    .unique();
                if (!existing) {
                    await ctx.db.insert("known_words", { userId: args.userId, word, addedAt: Date.now() });
                }
            }

            // 6. Migrate Study Queue
            const studyQueue = Array.isArray(args.studyQueue) ? args.studyQueue : [];
            for (const item of studyQueue) {
                const existing = await ctx.db
                    .query("study_queue")
                    .withIndex("by_user_item", (q) => q.eq("userId", args.userId).eq("itemId", item.id))
                    .unique();
                if (!existing) {
                    await ctx.db.insert("study_queue", {
                        userId: args.userId,
                        itemId: item.id,
                        status: item.status,
                        currentStage: item.currentStage || "priming",
                        nextReviewNum: item.nextReviewNum || Date.now(),
                        lastUpdated: Date.now(),
                        details: item,
                    });
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
