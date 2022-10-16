import { put, takeEvery } from 'redux-saga/effects';
import {
  setActiveDialog,
  setActiveDialogSuccess,
  setContextMenuClose,
  setContextMenuCloseSuccess,
  setContextMenuOpen,
  setContextMenuOpenSuccess
} from './actions';

export function* openContextMenuSaga({ payload }: ReturnType<typeof setContextMenuOpen>) {
  yield put(setContextMenuOpenSuccess(payload.bookmark, payload.x, payload.y));
}

export function* closeContextMenuSaga() {
  yield put(setContextMenuCloseSuccess());
}

export function* openAppDialogSaga({ payload }: ReturnType<typeof setActiveDialog>) {
  yield put(setActiveDialogSuccess(payload.dialog));
}

export function* contextStateSagas() {
  yield takeEvery<ReturnType<typeof setContextMenuOpen>>('CONTEXT_MENU_OPEN', openContextMenuSaga);
  yield takeEvery<ReturnType<typeof setContextMenuClose>>('CONTEXT_MENU_CLOSE', closeContextMenuSaga);
  yield takeEvery<ReturnType<typeof setActiveDialog>>('CONTEXT_SET_ACTIVE_DIALOG', openAppDialogSaga);
}
