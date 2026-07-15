import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readUpload } from "@/lib/storage";

/**
 * GET /api/admin/document/[id] — streams a stored document.
 * Protected by the admin Basic-Auth middleware (matcher covers /api/admin).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = await db.document.findUnique({ where: { id } });
  if (!doc) return new NextResponse("Not found", { status: 404 });

  try {
    const bytes = await readUpload(doc.storedName);
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": doc.mime || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(doc.filename)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("File missing", { status: 410 });
  }
}
