import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Local filesystem storage for uploaded documents.
 * Files live outside the web root (default ./.data/uploads, override with
 * UPLOAD_DIR — on the VPS point this at a persistent volume). Only metadata
 * goes into the database; bytes stay on disk.
 */
export const UPLOAD_DIR = resolve(process.env.UPLOAD_DIR ?? "./.data/uploads");

const SAFE_EXT = new Set([".pdf", ".jpg", ".jpeg", ".png"]);

/** Persist a File to disk and return storage metadata. */
export async function saveUpload(file: File, subdir = "") {
  const dir = join(UPLOAD_DIR, subdir);
  await mkdir(dir, { recursive: true });

  const ext = SAFE_EXT.has(extname(file.name).toLowerCase())
    ? extname(file.name).toLowerCase()
    : "";
  const storedName = `${randomUUID()}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(dir, storedName), bytes);

  return {
    filename: file.name,
    storedName: subdir ? join(subdir, storedName) : storedName,
    mime: file.type,
    size: file.size,
  };
}

/** Read a stored file back (for the authenticated admin download route). */
export async function readUpload(storedName: string) {
  // guard against path traversal
  const full = resolve(join(UPLOAD_DIR, storedName));
  if (!full.startsWith(UPLOAD_DIR)) throw new Error("invalid path");
  return readFile(full);
}
