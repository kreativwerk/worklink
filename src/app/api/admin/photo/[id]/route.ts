import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readUpload } from "@/lib/storage";

/**
 * GET /api/admin/photo/[id] — streams an accommodation photo.
 * Protected by the admin Basic-Auth middleware (matcher covers /api/admin).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const photo = await db.inquiryPhoto.findUnique({ where: { id } });
  if (!photo) return new NextResponse("Not found", { status: 404 });

  try {
    const bytes = await readUpload(photo.storedName);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": photo.mime || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(photo.filename)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("File missing", { status: 410 });
  }
}
