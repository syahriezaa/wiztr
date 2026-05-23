import { WiztrLandingPage } from "@/components/landing/WiztrLandingPage";
import { getAvailableItems } from "@/lib/catalog";
import { getSettings } from "@/lib/settings";

export default function Home() {
  const items = getAvailableItems();
  const settings = getSettings();
  return <WiztrLandingPage items={items} mainBannerUrl={settings.mainBannerUrl} mainBackgroundUrl={settings.mainBackgroundUrl} waAdmin1={settings.waAdmin1} waAdmin2={settings.waAdmin2} />;
}
