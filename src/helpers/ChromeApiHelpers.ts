import { BookmarkTreeNode } from '../redux/ducks/bookmarks/state';
import { SettingsState } from '../redux/ducks/settings/state';

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export async function getTree(): Promise<BookmarkTreeNode[]> {
  const instance = getChromeInstance();
  return instance.bookmarks.getTree();
}

export async function searchTree(query: string): Promise<BookmarkTreeNode[]> {
  const instance = getChromeInstance();
  return instance.bookmarks.search(query);
}

export async function getAppSettings(keys: (keyof SettingsState)[]): Promise<Partial<SettingsState>> {
  return chrome.storage.local.get(keys);
}

export async function setAppSettings(settings: Partial<SettingsState>): Promise<void> {
  return chrome.storage.local.set(settings);
}

export async function createBookmark(title: string, index: number, parentId: string, url?: string) {
  const instance = getChromeInstance();
  instance.bookmarks.create({ title, index, parentId, url });
}

export async function editBookmark(id: string, title: string, url?: string) {
  const instance = getChromeInstance();
  instance.bookmarks.update(id, { title, url });
}

export async function openInCurrentTab(url: string): Promise<void> {
  const [openWindow] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (openWindow?.id) {
    await chrome.tabs.update(openWindow.id, { active: true, url: String(url) });
  }
}

export async function openInNewTab(url: string): Promise<void> {
  await chrome.tabs.create({ url: String(url), active: false });
}

export async function openInNewWindow(url: string): Promise<void> {
  await chrome.windows.create({ url: String(url), incognito: false });
}

export async function openInNewIncognitoWindow(url: string): Promise<void> {
  await chrome.windows.create({ url: String(url), incognito: true });
}
