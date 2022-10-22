import { put, takeEvery } from 'redux-saga/effects';
import {
  clearCurrentAction,
  clearCurrentActionSuccess,
  mapActionStackItem,
  mapActionStackItemSuccess,
  popAction,
  popActionSuccess,
  pushAction,
  pushActionSuccess,
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

function* mapActionStackItemSaga({ payload }: ReturnType<typeof mapActionStackItem>) {
  yield put(mapActionStackItemSuccess(payload));
}

export function* actionStackSagas() {
  yield takeEvery<ReturnType<typeof pushAction>>('ACTION_STACK_PUSH', pushActionSaga);
  yield takeEvery<ReturnType<typeof popAction>>('ACTION_STACK_POP', popActionSaga);
  yield takeEvery<ReturnType<typeof clearCurrentAction>>(
    'ACTION_STACK_CURRENT_CLEAR',
    clearCurrentActionSaga
  );
  yield takeEvery<ReturnType<typeof mapActionStackItem>>('ACTION_STACK_MAP', mapActionStackItemSaga);
}
