import { put, takeEvery } from 'redux-saga/effects';
import {
  addAction,
  addActionSuccess,
  clearStackAction,
  clearStackActionSuccess,
  popAction,
  popActionSuccess,
} from './actions';

function* addActionSaga({ payload }: ReturnType<typeof addAction>) {
  yield put(addActionSuccess({ action: payload.action, showSnackbar: payload.showSnackbar }));
}

function* popActionSaga({ payload }: ReturnType<typeof popAction>) {
  yield put(popActionSuccess());
}

function* clearStackActionSaga({ payload }: ReturnType<typeof clearStackAction>) {
  yield put(clearStackActionSuccess());
}

export function* actionStackSagas() {
  yield takeEvery<ReturnType<typeof addAction>>('ACTION_STACK_ADD', addActionSaga);
  yield takeEvery<ReturnType<typeof popAction>>('ACTION_STACK_POP', popActionSaga);
  yield takeEvery<ReturnType<typeof clearStackAction>>('ACTION_STACK_CLEAR', clearStackActionSaga);
}
