/* eslint-disable no-undef */
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

new IconLoader();
