import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { bookmarksReducer } from './ducks/bookmarks/reducer';
import { contextReducer } from './ducks/context/reducer';
import { keyboardReducer } from './ducks/keyboard/reducer';
import { settingsReducer } from './ducks/settings/reducer';
import { defaultSaga } from './sagas';

const useLogging = false;
const logger = (store: any) => (next: any) => (action: any) => {
  if (useLogging) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  } else {
    return next(action);
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    bookmarks: bookmarksReducer,
    settings: settingsReducer,
    context: contextReducer,
    keyboard: keyboardReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(defaultSaga);

export default store;
