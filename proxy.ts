import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "wiztr_admin_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || "w1ztr-m3rch-s3cur3-k3y-d3f4ult-l0c4l"
);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteksi semua /admin kecuali /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    let valid = false;
    
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        valid = true;
      } catch (err) {
        valid = false;
      }
    }
    
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
