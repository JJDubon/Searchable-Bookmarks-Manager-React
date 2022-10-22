import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { actionStackSagas } from './ducks/action-stack/sagas';
import { startApp } from './ducks/actions';
import { loadBookmarks } from './ducks/bookmarks/actions';
import { bookmarksSagas } from './ducks/bookmarks/sagas';
import { BookmarkTreeNode } from './ducks/bookmarks/store';
import { contextSagas } from './ducks/context/sagas';
import { keyboardSagas } from './ducks/keyboard/sagas';
import { loadSettings } from './ducks/settings/actions';
import { settingsSagas } from './ducks/settings/sagas';
import { SettingsStore } from './ducks/settings/store';

type PopupOpenedResponse = { root?: BookmarkTreeNode[]; settings?: SettingsStore };

export function* defaultSaga() {
  yield all([
    settingsSagas(),
    bookmarksSagas(),
    contextSagas(),
    keyboardSagas(),
    initializationSaga(),
    actionStackSagas(),
  ]);
}

function* initializationSaga() {
  yield takeLatest<ReturnType<typeof startApp>>('APP_START', startAppSaga);
  yield put(startApp());
}

function* startAppSaga() {
  const response: PopupOpenedResponse = yield call(sendPopupOpenMessage);
  yield put(loadSettings({ settings: response.settings }));
  yield take('SETTINGS_LOAD_SUCCESS');
  yield put(loadBookmarks({ root: response.root }));
}

async function sendPopupOpenMessage(): Promise<PopupOpenedResponse> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'SBM_POPUP_OPENED' }, (response?: PopupOpenedResponse) => {
      resolve({ root: response?.root, settings: response?.settings });
    });
  });
}
