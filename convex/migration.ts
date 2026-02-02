import { v, ConvexError } from "convex/values";
import { mutation } from "./_generated/server";
import { curriculum } from "./seed_data";

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
            // Helper to remove 'undefined' which Convex forbids in objects
            const deepSanitize = (obj: any): any => {
                return JSON.parse(JSON.stringify(obj, (key, value) => {
                    return value === undefined ? null : value;
                }));
            };

            // Helper to sanitize SM2 state for Convex (removes nulls and extra fields)
            const sanitizeSM2 = (state: any) => {
                if (!state || typeof state !== 'object') return null;
                // Ensure all fields are explicitly defined or null, as undefined is not allowed in Convex objects
                return {
                    interval: typeof state.interval === 'number' ? state.interval : 0,
                    repetitions: typeof state.repetitions === 'number' ? state.repetitions : 0,
                    easeFactor: typeof state.easeFactor === 'number' ? state.easeFactor : 2.5,
                    nextReviewDate: typeof state.nextReviewDate === 'number' ? state.nextReviewDate : null, // Changed undefined to null
                    step: typeof state.step === 'number' ? state.step : null, // Changed undefined to null
                };
            };

            // 1. Migrate Progress
            const existingProgress = await ctx.db
                .query("user_progress")
                .collect(); // Simple collect is fine if we can't filter by user easily without index
            const progressMap = new Set(existingProgress.filter(p => p.userId === args.userId).map(p => p.topicId));

            for (const item of args.progress) {
                if (item.topicId && !progressMap.has(item.topicId)) {
                    await ctx.db.insert("user_progress", { userId: args.userId, topicId: item.topicId, proficiency: item.proficiency || 0 });
                }
            }

            // 2. Migrate SRS
            const existingSRS = await ctx.db
                .query("srs_data")
                .collect();
            const srsMap = new Set(existingSRS.filter(s => s.userId === args.userId).map(s => s.wordId));

            for (const item of args.srs) {
                if (item.wordId && !srsMap.has(item.wordId)) {
                    const cleanState = sanitizeSM2(item.state);
                    if (cleanState) {
                        await ctx.db.insert("srs_data", { userId: args.userId, wordId: item.wordId, ...cleanState });
                    }
                }
            }

            // 3. Migrate Folders & Words
            const existingFolders = await ctx.db
                .query("folders")
                .withIndex("by_user", (q) => q.eq("userId", args.userId))
                .collect();

            const folders = Array.isArray(args.folders) ? args.folders : [];
            for (const folder of folders) {
                let folderRecord = existingFolders.find(f => f.name === (folder.name || "Unnamed Folder"));
                let folderId;

                if (!folderRecord) {
                    folderId = await ctx.db.insert("folders", {
                        userId: args.userId,
                        name: folder.name || "Unnamed Folder",
                        createdAt: folder.createdAt || Date.now(),
                    });
                } else {
                    folderId = folderRecord._id;
                }

                // Batch check words in this folder
                const existingWordsInFolder = await ctx.db
                    .query("words")
                    .withIndex("by_folder_german", (q) => q.eq("folderId", folderId))
                    .collect();
                const wordMap = new Set(existingWordsInFolder.map(w => w.german));

                const folderWords = Array.isArray(folder.words) ? folder.words : [];
                for (const word of folderWords) {
                    const wordData = word.word || word;
                    if (!wordData?.german || wordMap.has(wordData.german)) continue;

                    await ctx.db.insert("words", {
                        folderId,
                        userId: args.userId,
                        german: wordData.german,
                        russian: wordData.russian || "",
                        type: wordData.type || "other",
                        details: deepSanitize(wordData),
                        sm2State: sanitizeSM2(word.sm2State) || {},
                        addedAt: word.addedAt || Date.now(),
                    });
                }
            }

            // 4. Migrate Exam Texts
            const existingTexts = await ctx.db
                .query("exam_texts")
                .withIndex("by_user", (q) => q.eq("userId", args.userId))
                .collect();
            const textMap = new Set(existingTexts.map(t => t.title));

            const examTexts = Array.isArray(args.examTexts) ? args.examTexts : [];
            for (const text of examTexts) {
                if (!text || !text.title || textMap.has(text.title)) continue;

                await ctx.db.insert("exam_texts", {
                    userId: args.userId,
                    title: String(text.title),
                    description: String(text.description || ""),
                    level: String(text.level || "B2"),
                    content: String(text.content || ""),
                    isCustom: true,
                    createdAt: typeof text.createdAt === 'number' ? text.createdAt : Date.now(),
                });
            }

            // 5. Migrate Known Words
            const existingKnown = await ctx.db
                .query("known_words")
                .collect();
            const knownSet = new Set(existingKnown.filter(k => k.userId === args.userId).map(k => k.word));

            const knownWords = Array.isArray(args.knownWords) ? args.knownWords : [];
            for (const word of knownWords) {
                if (!word || typeof word !== 'string' || knownSet.has(word)) continue;
                await ctx.db.insert("known_words", { userId: args.userId, word, addedAt: Date.now() });
            }

            // 6. Migrate Study Queue
            const existingQueue = await ctx.db
                .query("study_queue")
                .collect();
            const queueMap = new Set(existingQueue.filter(q => q.userId === args.userId).map(q => q.itemId));

            const studyQueue = Array.isArray(args.studyQueue) ? args.studyQueue : [];
            for (const item of studyQueue) {
                if (!item || !item.id || queueMap.has(String(item.id))) continue;

                await ctx.db.insert("study_queue", {
                    userId: args.userId,
                    itemId: String(item.id),
                    status: String(item.status || "new"),
                    currentStage: String(item.currentStage || "priming"),
                    nextReviewNum: typeof item.nextReviewNum === 'number' ? item.nextReviewNum : Date.now(),
                    lastUpdated: Date.now(),
                    details: deepSanitize(item),
                });
            }

            return { success: true };
        } catch (error: any) {
            console.error("Migration fatal error:", error);
            throw new ConvexError(`Migration error: ${error.message}`);
        }
    },
});

export const seedCurriculum = mutation({
    args: {},
    handler: async (ctx) => {
        // Helper to sanitize objects (remove undefined)
        const sanitize = (obj: any): any => JSON.parse(JSON.stringify(obj, (k, v) => v === undefined ? null : v));

        for (const level of curriculum.levels) {
            const existingLevel = await ctx.db.query("curriculum_levels").withIndex("by_level_id", q => q.eq("id", level.id)).first();

            if (existingLevel) {
                await ctx.db.patch(existingLevel._id, {
                    title: level.title,
                    description: level.description,
                    order: 0
                });
            } else {
                await ctx.db.insert("curriculum_levels", {
                    id: level.id,
                    title: level.title,
                    description: level.description,
                    order: 0
                });
            }

            for (const topic of level.topics) {
                const existingTopic = await ctx.db.query("curriculum_topics")
                    .withIndex("by_level_id", q => q.eq("levelId", level.id).eq("id", topic.id))
                    .first();

                const topicData = {
                    levelId: level.id,
                    id: topic.id,
                    title: topic.title,
                    explanation: topic.explanation,
                    vocabulary: sanitize(topic.vocabulary),
                    exercises: sanitize(topic.exercises),
                    order: 0
                };

                if (existingTopic) {
                    await ctx.db.patch(existingTopic._id, topicData);
                } else {
                    await ctx.db.insert("curriculum_topics", topicData);
                }
            }
        }
        return { success: true, message: "Curriculum seeded!" };
    }
});
