import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import { startApp } from './ducks/actions';
import { loadBookmarks } from './ducks/bookmarks/actions';
import { bookmarksSagas } from './ducks/bookmarks/sagas';
import { BookmarkTreeNode } from './ducks/bookmarks/state';
import { contextStateSagas } from './ducks/context/sagas';
import { keyboardStateSagas } from './ducks/keyboard/sagas';
import { loadSettings } from './ducks/settings/actions';
import { settingsSagas } from './ducks/settings/sagas';
import { SettingsState } from './ducks/settings/state';

type PopupOpenedResponse = { root?: BookmarkTreeNode[]; settings?: SettingsState };

export function* defaultSaga() {
  yield all([
    settingsSagas(),
    bookmarksSagas(),
    contextStateSagas(),
    keyboardStateSagas(),
    initializationSaga(),
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
