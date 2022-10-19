import { put, takeEvery } from 'redux-saga/effects';
import { setKeyboardState, setKeyboardStateSuccess } from './actions';

export function* setKeyboardStateSaga({ payload }: ReturnType<typeof setKeyboardState>) {
  yield put(setKeyboardStateSuccess({ changes: payload.changes }));
}

export function* keyboardStateSagas() {
  yield takeEvery<ReturnType<typeof setKeyboardState>>('KEYBOARD_STATE_SET', setKeyboardStateSaga);
}
