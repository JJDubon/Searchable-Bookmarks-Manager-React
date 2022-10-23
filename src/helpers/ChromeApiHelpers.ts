import { BookmarkTreeNode } from '../redux/ducks/bookmarks/store';
import { SettingsStore } from '../redux/ducks/settings/store';

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

export async function getAppSettings(keys: (keyof SettingsStore)[]): Promise<Partial<SettingsStore>> {
  return chrome.storage.local.get(keys);
}

export async function setAppSettings(settings: Partial<SettingsStore>): Promise<void> {
  return chrome.storage.local.set(settings);
}

export async function createBookmark(title: string, index: number, parentId: string, url?: string) {
  const instance = getChromeInstance();
  return await instance.bookmarks.create({ title, index, parentId, url });
}

export async function getBookmark(id: string) {
  const instance = getChromeInstance();
  const result = await instance.bookmarks.get(id);
  return result[0];
}

export async function getFolder(id: string) {
  const instance = getChromeInstance();
  const result = await instance.bookmarks.getSubTree(id);
  return result[0];
}

export async function editBookmark(id: string, title: string, url?: string) {
  const instance = getChromeInstance();
  return await instance.bookmarks.update(id, { title, url });
}

export async function moveBookmark(id: string, parentId: string, index: number) {
  const instance = getChromeInstance();
  return await instance.bookmarks.move(id, { parentId, index });
}

export async function removeBookmark(id: string) {
  const instance = getChromeInstance();
  return await instance.bookmarks.remove(id);
}

export async function removeFolder(id: string) {
  const instance = getChromeInstance();
  return await instance.bookmarks.removeTree(id);
}

export async function openInCurrentTab(url: string): Promise<void> {
  const [openWindow] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (openWindow?.id) {
    await chrome.tabs.update(openWindow.id, { active: true, url: String(url) });
  }
}

export async function openInNewTab(url: string, focus: boolean = false): Promise<void> {
  const tab = await chrome.tabs.create({ url: String(url), active: false });
  if (focus && tab.id) {
    await chrome.tabs.update(tab.id, { selected: true });
  }
}

export async function openInNewWindow(url: string): Promise<void> {
  await chrome.windows.create({ url: String(url), incognito: false });
}

export async function openInNewIncognitoWindow(url: string): Promise<void> {
  await chrome.windows.create({ url: String(url), incognito: true });
}
