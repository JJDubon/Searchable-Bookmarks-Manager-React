import { put, takeEvery } from 'redux-saga/effects';
import { setKeyboardStore, setKeyboardStoreSuccess } from './actions';

export function* setKeyboardStoreSaga({ payload }: ReturnType<typeof setKeyboardStore>) {
  yield put(setKeyboardStoreSuccess({ changes: payload.changes }));
}

export function* keyboardSagas() {
  yield takeEvery<ReturnType<typeof setKeyboardStore>>('KEYBOARD_STORE_SET', setKeyboardStoreSaga);
}
