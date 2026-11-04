import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Determine if Supabase credentials are valid and present
 */
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim() !== '' &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseAnonKey.includes('your-anon-key-here')
);

/**
 * Resilient Supabase client instance.
 * If credentials are not configured, uses a safe fallback placeholder URL
 * so imports do not throw, and application services can gracefully switch to constants.ts.
 */
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? (supabaseUrl as string) : 'https://fallback-placeholder.supabase.co',
  isSupabaseConfigured ? (supabaseAnonKey as string) : 'fallback-anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
