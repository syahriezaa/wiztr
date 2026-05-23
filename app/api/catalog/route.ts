import { NextResponse } from "next/server";
import { getAvailableItems } from "@/lib/catalog";

export async function GET() {
  const items = getAvailableItems();
  return NextResponse.json(items);
}
