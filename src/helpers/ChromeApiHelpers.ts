import { BookmarkTreeNode } from "../redux/ducks/bookmarks/state";
import { SettingsState } from "../redux/ducks/settings/state";

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export async function getTree(): Promise<BookmarkTreeNode[]> {
  const instance = getChromeInstance();
  return new Promise((resolve, reject) => {
    instance.bookmarks.getTree((results) => {
      resolve(results);
    })
  });
}

export async function getAppSettings(keys: (keyof SettingsState)[]): Promise<Partial<SettingsState>> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (values) => {
      console.log(values);
      resolve(values);
    })
  });
}

export async function setAppSettings(settings: Partial<SettingsState>): Promise<void> {
  console.log(settings);
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(settings, () => {
      resolve();
    });
  });
}
