import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux';

import bookmarksReducer from './ducks/bookmarks/reducer';
import { bookmarksSaga } from './ducks/bookmarks/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    bookmarks: bookmarksReducer
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(bookmarksSaga)
export default store;
