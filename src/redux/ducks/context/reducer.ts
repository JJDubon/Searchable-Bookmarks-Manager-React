import { createReducer } from '@reduxjs/toolkit';
import { setActiveDialogSuccess, setContextMenuCloseSuccess, setContextMenuOpenSuccess } from './actions';
import { AppDialogs, ContextStore } from './store';

const initialStore: ContextStore = {
  open: false,
  path: '',
  bookmark: null,
  x: 0,
  y: 0,
  activeDialog: AppDialogs.None,
};

export const contextReducer = createReducer(initialStore, (builder) => {
  builder.addCase(setContextMenuOpenSuccess, (store, action) => {
    store.open = true;
    store.path = action.payload.path;
    store.bookmark = action.payload.bookmark;
    store.x = action.payload.x;
    store.y = action.payload.y;
  });

  builder.addCase(setContextMenuCloseSuccess, (store, action) => {
    store.open = false;
  });

  builder.addCase(setActiveDialogSuccess, (store, action) => {
    store.activeDialog = action.payload.dialog;
  });
});
