/* eslint-disable no-undef */
class IconLoader {
  constructor() {
    chrome.runtime.onInstalled.addListener(() => {
      this.updateIcon();
      chrome.alarms.create('icon-refresh', { periodInMinutes: 1 });
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request && request.type === 'SBM_ICON_UPDATED') {
        this.updateIcon();
        sendResponse({});
      }
    });

    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'icon-refresh') {
        this.updateIcon();
      }
    });
  }

  updateIcon = async () => {
    const settings = await chrome.storage.local.get(null);
    chrome.action.setIcon({
      path: {
        16: `/images/icon-16-${settings?.iconColor ?? 'blue'}.png`,
        32: `/images/icon-32-${settings?.iconColor ?? 'blue'}.png`,
        48: `/images/icon-48-${settings?.iconColor ?? 'blue'}.png`,
      },
    });
  };
}

class DataCleaner {
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

  cleanData = async () => {
    const tree = await chrome.bookmarks.getTree();
    const { colorMap, defaultOpenMap } = (await chrome.storage.local.get(null)) ?? {};
    const walk = (node, cb) => {
      cb(node);
      node.children?.forEach((childNode) => {
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
  };
}

new IconLoader();
new DataCleaner();
