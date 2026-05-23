import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  available: boolean;
  createdAt: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "catalog.json");

export function getCatalog(): CatalogItem[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as CatalogItem[];
  } catch {
    return [];
  }
}

export function saveCatalog(items: CatalogItem[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export function getAvailableItems(): CatalogItem[] {
  return getCatalog().filter((item) => item.available);
}

export function addItem(
  data: Omit<CatalogItem, "id" | "createdAt">
): CatalogItem {
  const items = getCatalog();
  const newItem: CatalogItem = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  items.push(newItem);
  saveCatalog(items);
  return newItem;
}

export function updateItem(
  id: string,
  data: Partial<Omit<CatalogItem, "id" | "createdAt">>
): CatalogItem | null {
  const items = getCatalog();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  saveCatalog(items);
  return items[idx];
}

export function deleteItem(id: string): boolean {
  const items = getCatalog();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  saveCatalog(filtered);
  return true;
}
