import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Прогресс по темам
    user_progress: defineTable({
        userId: v.string(), // ID пользователя (для будущего Auth)
        topicId: v.string(), // ID темы (напр. "A1-intro")
        proficiency: v.number(), // Прогресс 0-100
    }).index("by_user_topic", ["userId", "topicId"]),

    // Данные интервальных повторений (SRS)
    srs_data: defineTable({
        userId: v.string(),
        wordId: v.string(), // Само слово или его уникальный ключ
        interval: v.number(),
        repetitions: v.number(),
        easeFactor: v.number(),
        nextReviewDate: v.optional(v.number()),
        step: v.optional(v.number()),
    }).index("by_user_word", ["userId", "wordId"]),

    // Пользовательские папки
    folders: defineTable({
        userId: v.string(),
        name: v.string(),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // Слова в папках
    words: defineTable({
        folderId: v.id("folders"),
        userId: v.string(),
        german: v.string(),
        russian: v.string(),
        type: v.string(),
        details: v.any(), // Полный объект VocabularyWord
        sm2State: v.any(), // Текущее состояние SM2
        addedAt: v.number(),
    }).index("by_folder", ["folderId"]),
});
