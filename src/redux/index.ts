import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import bookmarksReducer from './ducks/bookmarks/reducer';
import { bookmarksSagas } from './ducks/bookmarks/sagas';
import contextReducer from './ducks/context/reducer';
import { contextStateSagas } from './ducks/context/sagas';
import keyboardReducer from './ducks/keyboard/reducer';
import { keyboardStateSagas } from './ducks/keyboard/sagas';
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
    context: contextReducer,
    keyboard: keyboardReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

function* defaultSaga() {
  yield all([listStateSagas(), settingsSagas(), bookmarksSagas(), contextStateSagas(), keyboardStateSagas()]);
}

sagaMiddleware.run(defaultSaga);

export default store;
