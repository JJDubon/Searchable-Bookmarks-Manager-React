import { put, takeEvery } from 'redux-saga/effects';
import {
  pushAction,
  pushActionSuccess,
  clearCurrentAction,
  clearCurrentActionSuccess,
  popAction,
  popActionSuccess,
} from './actions';

function* pushActionSaga({ payload }: ReturnType<typeof pushAction>) {
  yield put(pushActionSuccess({ action: payload.action, showSnackbar: payload.showSnackbar }));
}

function* popActionSaga({ payload }: ReturnType<typeof popAction>) {
  yield put(popActionSuccess());
}

function* clearCurrentActionSaga({ payload }: ReturnType<typeof clearCurrentAction>) {
  yield put(clearCurrentActionSuccess());
}

export function* actionStackSagas() {
  yield takeEvery<ReturnType<typeof pushAction>>('ACTION_STACK_PUSH', pushActionSaga);
  yield takeEvery<ReturnType<typeof popAction>>('ACTION_STACK_POP', popActionSaga);
  yield takeEvery<ReturnType<typeof clearCurrentAction>>(
    'ACTION_STACK_CURRENT_CLEAR',
    clearCurrentActionSaga
  );
}
