import { put, takeEvery } from 'redux-saga/effects';
import { setListItemOpen, setListItemOpenSuccess, setListState, setListStateSuccess } from './actions';

export function* setListStateSaga({ payload }: ReturnType<typeof setListState>) {
  yield put(setListStateSuccess({ changes: payload.changes }));
}

export function* setOpenStatusSaga({ payload }: ReturnType<typeof setListItemOpen>) {
  yield put(setListItemOpenSuccess({ id: payload.id, open: payload.open }));
}

export function* listStateSagas() {
  yield takeEvery<ReturnType<typeof setListState>>('LIST_STATE_SET', setListStateSaga);
  yield takeEvery<ReturnType<typeof setListItemOpen>>('LIST_STATE_SET_OPEN', setOpenStatusSaga);
}
