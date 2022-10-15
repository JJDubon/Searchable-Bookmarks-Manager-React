import { BookmarkTreeNode } from "../redux/ducks/bookmarks/state";
import { SettingsState } from "../redux/ducks/settings/state";

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export async function getTree(): Promise<BookmarkTreeNode[]> {
  const instance = getChromeInstance();
  return instance.bookmarks.getTree();
}

export async function getAppSettings(keys: (keyof SettingsState)[]): Promise<Partial<SettingsState>> {
  return chrome.storage.local.get(keys);
}

export async function setAppSettings(settings: Partial<SettingsState>): Promise<void> {
  return chrome.storage.local.set(settings);
}
