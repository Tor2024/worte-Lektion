import { query } from "./_generated/server";

export const getFolders = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("folders").collect();
    },
});
