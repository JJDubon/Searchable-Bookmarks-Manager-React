import { createReducer } from '@reduxjs/toolkit';
import { BookmarkTreeNode } from '../../../apis/BookmarksApi/types';
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
    store.stack = [...store.stack];
    store.currentAction = action.payload.showSnackbar ? action.payload.action : null;
    return store;
  });

  builder.addCase(popActionSuccess, (store, action) => {
    store.stack.pop();
    store.stack = [...store.stack];
  });

  builder.addCase(clearCurrentActionSuccess, (store, action) => {
    store.currentAction = null;
  });

  builder.addCase(mapActionStackItemSuccess, (store, action) => {
    const targets = [...store.stack];
    if (store.currentAction) {
      targets.push(store.currentAction);
    }

    targets.forEach((item) => {
      mapNode(item.bookmark, action.payload.newNode, action.payload.id);
      if ('previousBookmark' in item) {
        mapNode(item.previousBookmark, action.payload.newNode, action.payload.id);
      }
    });
  });
});

function mapNode(target: BookmarkTreeNode, node: BookmarkTreeNode, matchId: string) {
  walk(target, (current) => {
    if (current.id === matchId) {
      current.id = node.id;
    }
    if (current.parentId === matchId) {
      current.parentId = node.id;
    }
  });

  function walk(node: BookmarkTreeNode, cb: (node: BookmarkTreeNode) => void) {
    cb(node);
    node.children?.forEach((c) => walk(c, cb));
  }
}
