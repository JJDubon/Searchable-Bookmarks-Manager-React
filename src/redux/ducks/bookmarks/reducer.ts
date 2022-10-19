import { createReducer } from '@reduxjs/toolkit';
import {
  loadBookmarksFailure,
  loadBookmarksSuccess,
  resetBookmarksSuccess,
  searchBookmarksFailure,
  searchBookmarksSuccess,
} from './actions';
import { BookmarksState } from './state';

const initialState: BookmarksState = {
  loading: true,
  root: [],
  rootNodes: [],
  activeNodes: [],
  map: {},
  query: '',
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
});
