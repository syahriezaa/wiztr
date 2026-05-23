import { NextResponse } from "next/server";
import { getCatalog, addItem } from "@/lib/catalog";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = getCatalog();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { name, description, category, image, available } = body;
    if (!name || !category) {
      return NextResponse.json(
        { error: "name dan category wajib diisi" },
        { status: 400 }
      );
    }
    const newItem = addItem({
      name,
      description: description ?? "",
      category,
      image: image ?? "",
      available: available ?? true,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
