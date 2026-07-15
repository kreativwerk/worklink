import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * HTTP Basic Auth for the admin area and its API. Set ADMIN_USER (default
 * "admin") and ADMIN_PASSWORD in the environment. Runs on the edge runtime.
 */
export function middleware(req: NextRequest) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    return new NextResponse(
      "Admin nicht konfiguriert — bitte ADMIN_PASSWORD setzen.",
      { status: 503 },
    );
  }

  const user = process.env.ADMIN_USER || "admin";
  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const [u, p] = atob(header.slice(6)).split(":");
      if (u === user && p === pass) return NextResponse.next();
    } catch {
      /* fall through to 401 */
    }
  }

  return new NextResponse("Authentifizierung erforderlich", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="WorkLink Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
