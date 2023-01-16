import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { setAppSettings } from '../../helpers/ChromeApiHelpers';
import { emitIfModified } from '../../helpers/RxjsHelpers';
import { defaultSettings } from './default';
import { FolderColor, Settings } from './types';

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

  public async setColor(id: string, color: FolderColor | undefined) {
    const clonedMap = cloneDeep(this.settings.colorMap || {});
    if (color === undefined) {
      delete clonedMap[id];
    } else {
      clonedMap[id] = color;
    }

    await this.updateSettings({ colorMap: clonedMap });
  }

  public async mapColor(id: string, newId: string) {
    if (id !== newId && this.settings.colorMap !== undefined && this.settings.colorMap[id] !== undefined) {
      const clonedMap = cloneDeep(this.settings.colorMap || {});
      clonedMap[newId] = clonedMap[id];
      clonedMap[id] = undefined;
      delete clonedMap[id];
      await this.updateSettings({ colorMap: clonedMap });
    }
  }

  private onUpdate() {
    emitIfModified(this.observables.settings, this.settings);
  }
}
