import { createReducer } from '@reduxjs/toolkit';
import {
  clearCurrentActionSuccess,
  mapActionStackItemSuccess,
  popActionSuccess,
  pushActionSuccess,
} from './actions';
import { ActionStackStore } from './store';

const initialStore: ActionStackStore = {
  stack: [],
  currentAction: null,
};

export const actionStackReducer = createReducer(initialStore, (builder) => {
  builder.addCase(pushActionSuccess, (store, action) => {
    store.stack.push(action.payload.action);
    store.currentAction = action.payload.showSnackbar ? action.payload.action : null;
    return store;
  });

  builder.addCase(popActionSuccess, (store, action) => {
    store.stack.pop();
  });

  builder.addCase(clearCurrentActionSuccess, (store, action) => {
    store.currentAction = null;
  });

  builder.addCase(mapActionStackItemSuccess, (store, action) => {
    store.stack.forEach((item) => {
      if (item.bookmark.id === action.payload.oldId) {
        item.bookmark.id = action.payload.id;
      }
      if (item.bookmark.parentId === action.payload.oldId) {
        item.bookmark.parentId = action.payload.id;
      }
      if (item.bookmark.children) {
        item.bookmark.children = item.bookmark.children.map((c) =>
          c === action.payload.oldId ? action.payload.id : c
        );
      }
      if ('previousBookmark' in item) {
        if (item.previousBookmark.id === action.payload.oldId) {
          item.previousBookmark.id = action.payload.id;
        }
        if (item.previousBookmark.parentId === action.payload.oldId) {
          item.previousBookmark.parentId = action.payload.id;
        }
        if (item.previousBookmark.children) {
          item.previousBookmark.children = item.previousBookmark.children.map((c) =>
            c === action.payload.oldId ? action.payload.id : c
          );
        }
      }
    });
  });
});
