import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/settings";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    // Only extract known fields
    const { mainBannerUrl } = body;
    const updated = saveSettings({ mainBannerUrl });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
