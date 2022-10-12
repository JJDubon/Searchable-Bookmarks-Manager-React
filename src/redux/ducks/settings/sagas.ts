import { call, put, takeEvery } from 'redux-saga/effects';
import { getAppSettings, setAppSettings } from '../../../helpers/ChromeApiHelpers';
import { loadSettingsFailure, loadSettingsSuccess, setSettings, setSettingsFailure, setSettingsSuccess } from './actions';
import { SettingsState, SettingsStateKeys } from './state';

export function* loadSettingsSaga() {
  try {
    const settings: SettingsState = yield call(getAppSettings, SettingsStateKeys);
    yield put(loadSettingsSuccess(settings));
  } catch (ex) {
    yield put(loadSettingsFailure());
  }
}

export function* setSettingsSaga({ payload }: ReturnType<typeof setSettings>) {
  try {
    yield call(() => setAppSettings(payload));
    yield put(setSettingsSuccess(payload));
  } catch (ex) {
    yield put(setSettingsFailure());
  }
}

export function* settingsSagas() {
  yield takeEvery("SETTINGS_LOAD", loadSettingsSaga);
  yield takeEvery<ReturnType<typeof setSettings>>("SETTINGS_SET", setSettingsSaga);
}
