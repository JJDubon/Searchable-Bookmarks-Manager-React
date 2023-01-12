import { BehaviorSubject } from 'rxjs';
import { setAppSettings } from '../../helpers/ChromeApiHelpers';
import { defaultSettings } from './default';
import { Settings } from './types';

export class SettingsService {
  private settings: Settings;
  private settingsUpdatedFn = this.forceUpdate.bind(this);

  public readonly observables = {
    settings: new BehaviorSubject<Settings>(defaultSettings),
  };

  constructor(settings: Settings) {
    chrome.storage.local.onChanged.addListener(this.settingsUpdatedFn);
    this.settings = { ...defaultSettings, ...settings };
    this.onUpdate();
  }

  public async forceUpdate() {
    const settings = await chrome.storage.local.get(null);
    this.settings = { ...defaultSettings, ...settings };
    this.onUpdate();
  }

  public async updateSettings(settings: Partial<Settings>) {
    this.settings = { ...this.settings, ...settings };
    await setAppSettings(this.settings);
    if (settings.iconColor) {
      chrome.runtime.sendMessage({ type: 'SBM_ICON_UPDATED' });
    }

    this.onUpdate();
  }

  private onUpdate() {
    this.observables.settings.next(this.settings);
  }
}
