import { put } from "@vercel/blob";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function saveUploadedImage(
  file: File | null,
  prefix: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED.has(file.type)) {
    throw new Error("La imagen debe ser JPG, PNG o WEBP.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("La imagen no puede superar 5MB.");
  }

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${prefix}-${Date.now()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}
