import { mutation } from "./_generated/server";

export const clearAllData = mutation({
    args: {},
    handler: async (ctx) => {
        // List of all tables from schema.ts
        const tables = [
            "user_progress",
            "srs_data",
            "folders",
            "words",
            "exam_texts",
            "known_words",
            "study_queue",
            "curriculum_levels",
            "curriculum_topics"
        ] as const;

        let totalDeleted = 0;

        for (const table of tables) {
            const documents = await ctx.db.query(table).collect();
            for (const doc of documents) {
                await ctx.db.delete(doc._id);
                totalDeleted++;
            }
        }

        return { success: true, deletedCount: totalDeleted };
    },
});
