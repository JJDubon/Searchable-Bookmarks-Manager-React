/* eslint-disable no-undef */
class DataPreloader {
  root = null;
  settings = null;

  constructor() {
    chrome.bookmarks.onChanged.addListener(() => this.getRoot());
    chrome.bookmarks.onChildrenReordered.addListener(() => this.getRoot());
    chrome.bookmarks.onCreated.addListener(() => this.getRoot());
    chrome.bookmarks.onMoved.addListener(() => this.getRoot());
    chrome.bookmarks.onRemoved.addListener(() => this.getRoot());
    chrome.storage.local.onChanged.addListener(() => this.getSettings());

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request && request.type === 'SBM_POPUP_OPENED') {
        sendResponse({
          root: this.root,
          settings: this.settings,
        });
      }
    });

    chrome.runtime.onInstalled.addListener(() => {
      this.getRoot();
      this.getSettings();
    });
  }

  getRoot = async () => {
    this.root = await chrome.bookmarks.getTree();
  };

  getSettings = async () => {
    this.settings = await chrome.storage.local.get(null);
  };
}

class IconLoader {
  constructor() {
    chrome.runtime.onInstalled.addListener(() => {
      this.updateIcon();
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request && request.type === 'SBM_ICON_UPDATED') {
        this.updateIcon();
        sendResponse({});
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

new DataPreloader();
new IconLoader();
