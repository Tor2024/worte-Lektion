import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// Silent initialization - don't scream if keys are missing
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// Helper to check if cloud sync is actually possible - DISABLED BY USER REQUEST
export const isCloudSyncEnabled = false;

if (!isCloudSyncEnabled) {
    if (typeof window !== 'undefined') {
        console.warn('☁️ Cloud Sync is disabled: Missing or invalid Supabase configuration.');
    }
}
