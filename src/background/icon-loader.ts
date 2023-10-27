export class IconLoader {
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

  private async updateIcon() {
    const settings = await chrome.storage.local.get(null);
    chrome.action.setIcon({
      path: {
        16: `/images/icon-16-${settings?.iconColor ?? 'blue'}.png`,
        32: `/images/icon-32-${settings?.iconColor ?? 'blue'}.png`,
        48: `/images/icon-48-${settings?.iconColor ?? 'blue'}.png`,
      },
    });
  }
}
