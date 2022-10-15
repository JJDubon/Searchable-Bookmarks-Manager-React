import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import bookmarksReducer from './ducks/bookmarks/reducer';
import { bookmarksSagas } from './ducks/bookmarks/sagas';
import settingsReducer from './ducks/settings/reducer';
import { settingsSagas } from './ducks/settings/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    bookmarks: bookmarksReducer,
    settings: settingsReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

function* defaultSaga() {
  yield all([settingsSagas(), bookmarksSagas()]);
}

sagaMiddleware.run(defaultSaga);

export default store;
