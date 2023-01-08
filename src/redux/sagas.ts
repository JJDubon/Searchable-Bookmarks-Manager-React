import { all, put } from 'redux-saga/effects';
import { actionStackSagas } from './ducks/action-stack/sagas';
import { startApp } from './ducks/actions';
import { contextSagas } from './ducks/context/sagas';

export function* defaultSaga() {
  yield all([contextSagas(), initializationSaga(), actionStackSagas()]);
}

function* initializationSaga() {
  yield put(startApp());
}
