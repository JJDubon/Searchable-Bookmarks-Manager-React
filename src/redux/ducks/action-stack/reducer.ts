import { createReducer } from '@reduxjs/toolkit';
import { FlattenedBookmarkTreeNode } from '../bookmarks/store';
import {
  clearCurrentActionSuccess,
  mapActionStackItemSuccess,
  popActionSuccess,
  pushActionSuccess,
} from './actions';
import { ActionStackStore, BookmarkTreeNode } from './store';

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

function mapNode(target: FlattenedBookmarkTreeNode, node: BookmarkTreeNode, matchId: string) {
  if (target.id === matchId) {
    target.id = node.id;
  }
  if (target.parentId === matchId) {
    target.parentId = node.id;
  }
  if (target.children) {
    target.children = target.children.map((c) => (c === matchId ? node.id : c));
  }
}
