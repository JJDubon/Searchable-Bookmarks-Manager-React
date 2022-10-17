import { SettingsState } from './state';

export function loadSettings(settings?: SettingsState) {
  return {
    type: 'SETTINGS_LOAD' as 'SETTINGS_LOAD',
    payload: { settings },
  };
}

export function loadSettingsSuccess(settings: SettingsState) {
  return {
    type: 'SETTINGS_LOAD_SUCCESS' as 'SETTINGS_LOAD_SUCCESS',
    payload: { settings },
  };
}

export function loadSettingsFailure() {
  return { type: 'SETTINGS_LOAD_FAILURE' as 'SETTINGS_LOAD_FAILURE' };
}

export function getSettings() {
  return { type: 'SETTINGS_GET' as 'SETTINGS_GET' };
}

export function setSettings(settings: Partial<SettingsState>) {
  return {
    type: 'SETTINGS_SET' as 'SETTINGS_SET',
    payload: { settings },
  };
}

export function setSettingsSuccess(settings: Partial<SettingsState>) {
  return {
    type: 'SETTINGS_SET_SUCCESS' as 'SETTINGS_SET_SUCCESS',
    payload: { settings },
  };
}

export function setSettingsFailure() {
  return { type: 'SETTINGS_SET_FAILURE' as 'SETTINGS_SET_FAILURE' };
}

export type SettingsActions =
  | ReturnType<typeof getSettings>
  | ReturnType<typeof loadSettings>
  | ReturnType<typeof loadSettingsSuccess>
  | ReturnType<typeof loadSettingsFailure>
  | ReturnType<typeof setSettings>
  | ReturnType<typeof setSettingsSuccess>
  | ReturnType<typeof setSettingsFailure>;
