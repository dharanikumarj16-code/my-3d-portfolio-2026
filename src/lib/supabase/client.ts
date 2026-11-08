import { createBrowserClient } from "@supabase/ssr";

const FALLBACK_URL = "https://gecpxwasdckgphqxqiqu.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlY3B4d2FzZGNrZ3BocXhxaXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyODQzODMsImV4cCI6MjEwMjg2MDM4M30.6EQivRy1TwPw0mKzOWt3FCX8DFi0x7w8Ak2-aGaon4Y";

/**
 * Extracts strictly the origin (e.g. "https://gecpxwasdckgphqxqiqu.supabase.co")
 * stripping any trailing slashes, `/rest/v1`, or subpaths that trigger "Invalid path specified in request URL".
 */
export function getSanitizedSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
  try {
    const parsed = new URL(raw.trim());
    return parsed.origin;
  } catch {
    return FALLBACK_URL;
  }
}

export function getSanitizedSupabaseAnonKey(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!raw || raw.trim().length === 0) {
    return FALLBACK_ANON_KEY;
  }
  return raw.trim();
}

export function createClient() {
  const url = getSanitizedSupabaseUrl();
  const anonKey = getSanitizedSupabaseAnonKey();

  return createBrowserClient(url, anonKey);
}
