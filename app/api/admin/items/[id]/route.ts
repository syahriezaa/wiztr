import { NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/lib/catalog";
import { isAuthenticatedFromRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updateItem(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Item tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const deleted = deleteItem(id);
  if (!deleted) {
    return NextResponse.json({ error: "Item tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
