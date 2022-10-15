import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import bookmarksReducer from './ducks/bookmarks/reducer';
import { bookmarksSagas } from './ducks/bookmarks/sagas';
import listReducer from './ducks/list/reducer';
import { listStateSagas } from './ducks/list/sagas';
import settingsReducer from './ducks/settings/reducer';
import { settingsSagas } from './ducks/settings/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    list: listReducer,
    bookmarks: bookmarksReducer,
    settings: settingsReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

function* defaultSaga() {
  yield all([listStateSagas(), settingsSagas(), bookmarksSagas()]);
}

sagaMiddleware.run(defaultSaga);

export default store;
