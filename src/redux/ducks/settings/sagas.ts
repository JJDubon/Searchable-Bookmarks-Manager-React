import { call, put, takeEvery } from 'redux-saga/effects';
import { getAppSettings, setAppSettings } from '../../../helpers/ChromeApiHelpers';
import {
  loadSettings,
  loadSettingsFailure,
  loadSettingsSuccess,
  setSettings,
  setSettingsFailure,
  setSettingsSuccess,
} from './actions';
import { SettingsStore, SettingsStoreKeys } from './store';

export function* loadSettingsSaga({ payload }: ReturnType<typeof loadSettings>) {
  try {
    const settings: SettingsStore = payload.settings ?? (yield call(getAppSettings, SettingsStoreKeys));
    yield put(loadSettingsSuccess({ settings }));
  } catch (ex) {
    yield put(loadSettingsFailure());
  }
}

export function* setSettingsSaga({ payload }: ReturnType<typeof setSettings>) {
  try {
    yield call(() => setAppSettings(payload.settings));
    yield put(setSettingsSuccess({ settings: payload.settings }));
    if (payload.settings.iconColor) {
      yield chrome.runtime.sendMessage({ type: 'SBM_ICON_UPDATED' });
    }
  } catch (ex) {
    yield put(setSettingsFailure());
  }
}

export function* settingsSagas() {
  yield takeEvery('SETTINGS_LOAD', loadSettingsSaga);
  yield takeEvery<ReturnType<typeof setSettings>>('SETTINGS_SET', setSettingsSaga);
}
