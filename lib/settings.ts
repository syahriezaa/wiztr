import fs from "fs";
import path from "path";

export interface AppSettings {
  mainBannerUrl: string;
  mainBackgroundUrl: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "settings.json");

const defaultSettings: AppSettings = {
  mainBannerUrl: "/brand/wiztr-banner.svg",
  mainBackgroundUrl: "/brand/wiztr-bg.svg",
};

export function getSettings(): AppSettings {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    // Return default if file doesn't exist or is corrupted
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<AppSettings>): AppSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}
