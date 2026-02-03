
// Mock/Placeholder for Supabase - UNUSED in Local-Only mode
export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signOut: async () => ({ error: null }),
    }
} as any;

export const isCloudSyncEnabled = false;
