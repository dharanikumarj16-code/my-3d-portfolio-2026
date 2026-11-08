import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSanitizedSupabaseUrl, getSanitizedSupabaseAnonKey } from "./client";

export function createServerSupabaseClient() {
  const cookieStore = cookies();
  const url = getSanitizedSupabaseUrl();
  const anonKey = getSanitizedSupabaseAnonKey();

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Can happen in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // Can happen in Server Components
          }
        },
      },
    }
  );
}
