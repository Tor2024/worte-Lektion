import { query } from "./_generated/server";

export const countFolders = query({
    args: {},
    handler: async (ctx) => {
        const folders = await ctx.db.query("folders").collect();
        return folders.length;
    },
});
