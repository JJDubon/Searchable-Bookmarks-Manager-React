import { put, takeEvery } from 'redux-saga/effects';
import {
  addAction,
  addActionSuccess,
  clearCurrentAction,
  clearCurrentActionSuccess,
  popAction,
  popActionSuccess,
} from './actions';

function* addActionSaga({ payload }: ReturnType<typeof addAction>) {
  yield put(addActionSuccess({ action: payload.action, showSnackbar: payload.showSnackbar }));
}

function* popActionSaga({ payload }: ReturnType<typeof popAction>) {
  yield put(popActionSuccess());
}

function* clearCurrentActionSaga({ payload }: ReturnType<typeof clearCurrentAction>) {
  yield put(clearCurrentActionSuccess());
}

export function* actionStackSagas() {
  yield takeEvery<ReturnType<typeof addAction>>('ACTION_STACK_ADD', addActionSaga);
  yield takeEvery<ReturnType<typeof popAction>>('ACTION_STACK_POP', popActionSaga);
  yield takeEvery<ReturnType<typeof clearCurrentAction>>(
    'ACTION_STACK_CURRENT_CLEAR',
    clearCurrentActionSaga
  );
}
