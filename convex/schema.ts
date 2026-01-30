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
    }).index("by_user", ["userId"])
        .index("by_user_name", ["userId", "name"]),

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
    }).index("by_folder", ["folderId"])
        .index("by_folder_german", ["folderId", "german"]),

    // Тексты для экзаменов
    exam_texts: defineTable({
        userId: v.string(),
        title: v.string(),
        description: v.string(),
        level: v.string(),
        content: v.string(),
        isCustom: v.boolean(),
        createdAt: v.number(),
    }).index("by_user", ["userId"]),

    // Список известных слов
    known_words: defineTable({
        userId: v.string(),
        word: v.string(),
        addedAt: v.number(),
    }).index("by_user", ["userId"])
        .index("by_user_word", ["userId", "word"]),

    // Очередь изучения (Study Queue)
    study_queue: defineTable({
        userId: v.string(),
        itemId: v.string(), // ID элемента (обычно немецкое слово)
        status: v.string(), // "new", "learning", "review", etc.
        currentStage: v.string(),
        nextReviewNum: v.number(),
        lastUpdated: v.number(),
        details: v.any(), // StudyQueueItem data
    }).index("by_user", ["userId"])
        .index("by_user_item", ["userId", "itemId"]),
});
