import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/** False when the build is missing Supabase env vars (e.g. they weren't set
    on the deploy host). The app renders a setup notice instead of crashing. */
export const supabaseConfigured = Boolean(url && key);

export const supabase: SupabaseClient = supabaseConfigured
  ? createClient(url!, key!)
  : (new Proxy({}, {
      get() { throw new Error("Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY"); },
    }) as SupabaseClient);
