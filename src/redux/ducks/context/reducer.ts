import { createReducer } from '@reduxjs/toolkit';
import { setActiveDialogSuccess, setContextMenuCloseSuccess, setContextMenuOpenSuccess } from './actions';
import { AppDialogs, ContextState } from './state';

const initialState: ContextState = {
  open: false,
  path: '',
  bookmark: null,
  x: 0,
  y: 0,
  activeDialog: AppDialogs.None,
};

export const contextReducer = createReducer(initialState, (builder) => {
  builder.addCase(setContextMenuOpenSuccess, (state, action) => {
    return {
      ...state,
      open: true,
      path: action.payload.path,
      bookmark: action.payload.bookmark,
      x: action.payload.x,
      y: action.payload.y,
    };
  });

  builder.addCase(setContextMenuCloseSuccess, (state, action) => {
    return {
      ...state,
      open: false,
    };
  });

  builder.addCase(setActiveDialogSuccess, (state, action) => {
    return {
      ...state,
      activeDialog: action.payload.dialog,
    };
  });
});
