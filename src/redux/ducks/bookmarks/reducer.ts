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
import { BookmarksState } from './state';

const initialState: BookmarksState = {
  loading: true,
  root: [],
  rootNodes: [],
  activeNodes: [],
  map: {},
  query: '',
  openMap: {},
  searchResultsOpenMap: {},
};

export const bookmarksReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadBookmarksSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      root: action.payload.root,
      rootNodes: action.payload.root,
      activeNodes: action.payload.root,
      map: action.payload.map,
    };
  });

  builder.addCase(loadBookmarksFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      root: [],
      activeNodes: [],
      map: {},
    };
  });

  builder.addCase(searchBookmarksSuccess, (state, action) => {
    const queryExists = action.payload.query && action.payload.query.length !== 0;
    return {
      ...state,
      query: action.payload.query,
      activeNodes: queryExists ? action.payload.results : state.rootNodes,
    };
  });

  builder.addCase(searchBookmarksFailure, (state, action) => {
    return {
      ...state,
      activeNodes: state.rootNodes,
    };
  });

  builder.addCase(resetBookmarksSuccess, (state, action) => {
    return {
      ...state,
      root: action.payload.root,
      rootNodes: action.payload.root,
      map: action.payload.map,
    };
  });

  builder.addCase(bookmarksUpdatedSuccess, (state, action) => {
    return {
      ...state,
      openMap: action.payload.openMap,
      searchResultsOpenMap: action.payload.searchResultsOpenMap,
    };
  });

  builder.addCase(setBookmarkOpenSuccess, (state, action) => {
    if (state.query && state.query.length !== 0) {
      return {
        ...state,
        searchResultsOpenMap: {
          ...state.searchResultsOpenMap,
          [action.payload.path]: action.payload.open,
        },
      };
    } else {
      return {
        ...state,
        openMap: {
          ...state.openMap,
          [action.payload.path]: action.payload.open,
        },
      };
    }
  });
});
