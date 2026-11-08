import { createClient } from "./client";

/**
 * Uploads a file (image, resume PDF, etc.) to Supabase Storage and returns its public CDN URL.
 */
export async function uploadPortfolioAsset(
  file: File,
  folder: "resumes" | "avatars" | "projects" | "skills" = "projects"
): Promise<{ url: string | null; error: string | null }> {
  try {
    const supabase = createClient();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from("portfolio-assets")
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err?.message || "Failed to upload asset" };
  }
}
