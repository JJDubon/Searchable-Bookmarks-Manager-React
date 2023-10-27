export class DataCleaner {
  constructor() {
    chrome.runtime.onInstalled.addListener(() => {
      this.cleanData();
      chrome.alarms.create('data-cleaning', { periodInMinutes: 5 });
    });

    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'data-cleaning') {
        this.cleanData();
      }
    });
  }

  private async cleanData() {
    const tree = await chrome.bookmarks.getTree();
    const { colorMap, defaultOpenMap } = (await chrome.storage.local.get(null)) ?? {};
    const walk = (node: chrome.bookmarks.BookmarkTreeNode, cb: { (node: any): void; (arg0: any): void }) => {
      cb(node);
      node.children?.forEach((childNode: any) => {
        walk(childNode, cb);
      });
    };

    const ids = new Set();
    tree.forEach((rootNode) =>
      walk(rootNode, (node) => {
        ids.add(node.id);
      })
    );

    if (colorMap) {
      Object.keys(colorMap).forEach((key) => {
        if (!ids.has(key) || colorMap[key] === 'Grey') {
          delete colorMap[key];
        }
      });
    }

    if (defaultOpenMap) {
      Object.keys(defaultOpenMap).forEach((key) => {
        if (!ids.has(key)) {
          delete defaultOpenMap[key];
        }
      });
    }

    await chrome.storage.local.set({ colorMap, defaultOpenMap });
  }
}
