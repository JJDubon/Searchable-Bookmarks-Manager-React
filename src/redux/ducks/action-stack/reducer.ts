import { createReducer } from '@reduxjs/toolkit';
import { pushActionSuccess, clearCurrentActionSuccess, popActionSuccess } from './actions';
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
});
