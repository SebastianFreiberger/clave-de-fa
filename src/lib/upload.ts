import { writeFile, mkdir } from "fs/promises";
import path from "path";

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
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}
