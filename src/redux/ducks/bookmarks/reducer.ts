import { createReducer } from '@reduxjs/toolkit';
import {
  bookmarksUpdatedSuccess,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  resetBookmarksSuccess,
  searchBookmarksFailure,
  searchBookmarksSuccess,
  setBookmarkOpenSuccess,
} from './actions';
import { BookmarksStore } from './store';

const initialStore: BookmarksStore = {
  loading: true,
  rootNodes: [],
  activeNodes: [],
  map: {},
  query: '',
  openMap: {},
  searchResultsOpenMap: {},
};

export const bookmarksReducer = createReducer(initialStore, (builder) => {
  builder.addCase(loadBookmarksSuccess, (store, action) => {
    store.loading = false;
    store.rootNodes = action.payload.root;
    store.activeNodes = action.payload.root;
    store.map = action.payload.map;
  });

  builder.addCase(loadBookmarksFailure, (store, action) => {
    store.loading = false;
    store.rootNodes = [];
    store.activeNodes = [];
    store.map = {};
  });

  builder.addCase(searchBookmarksSuccess, (store, action) => {
    const queryExists = action.payload.query && action.payload.query.length !== 0;
    store.query = action.payload.query;
    store.activeNodes = queryExists ? action.payload.results : store.rootNodes;
  });

  builder.addCase(searchBookmarksFailure, (store, action) => {
    store.activeNodes = store.rootNodes;
  });

  builder.addCase(resetBookmarksSuccess, (store, action) => {
    store.rootNodes = action.payload.root;
    store.map = action.payload.map;
  });

  builder.addCase(bookmarksUpdatedSuccess, (store, action) => {
    store.openMap = action.payload.openMap;
    store.searchResultsOpenMap = action.payload.searchResultsOpenMap;
  });

  builder.addCase(setBookmarkOpenSuccess, (store, action) => {
    if (store.query && store.query.length !== 0) {
      store.searchResultsOpenMap[action.payload.path] = action.payload.open;
    } else {
      store.openMap[action.payload.path] = action.payload.open;
    }
  });
});
