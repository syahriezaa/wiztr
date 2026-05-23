import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "wiztr_admin_session";
// Fallback secret for development if env var is missing. In production, always set SESSION_SECRET!
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || "w1ztr-m3rch-s3cur3-k3y-d3f4ult-l0c4l"
);

export function verifyCredentials(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function setSession(): Promise<void> {
  const cookieStore = await cookies();
  
  // Create JWT Token
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET_KEY);

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!token) return false;

  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

export async function isAuthenticatedFromRequest(request: Request): Promise<boolean> {
  // Parse cookies from headers
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(^| )${SESSION_COOKIE}=([^;]+)`));
  const token = match ? match[2] : null;

  if (!token) return false;

  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
