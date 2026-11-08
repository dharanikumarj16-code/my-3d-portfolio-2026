import { createBrowserClient } from "@supabase/ssr";

export function getSanitizedSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  // Strip trailing slashes, /rest/v1, or /rest/v1/ that cause "Invalid path specified in request URL"
  return raw.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}

export function getSanitizedSupabaseAnonKey(): string {
  return (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
}

export function createClient() {
  const url = getSanitizedSupabaseUrl();
  const anonKey = getSanitizedSupabaseAnonKey();

  return createBrowserClient(url, anonKey);
}
