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
    chrome.bookmarks.getTree((root) => {
      this.root = root;
    });
  };

  getSettings = async () => {
    chrome.storage.local.get(null, (settings) => {
      this.settings = settings;
    });
  };
}

new DataPreloader();
