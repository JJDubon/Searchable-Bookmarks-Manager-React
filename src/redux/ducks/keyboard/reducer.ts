import { createReducer } from '@reduxjs/toolkit';
import { setKeyboardStoreSuccess } from './actions';
import { KeyboardStore } from './store';

const initialStore: KeyboardStore = {
  activePath: null,
  linearList: [],
};

export const keyboardReducer = createReducer(initialStore, (builder) => {
  builder.addCase(setKeyboardStoreSuccess, (store, action) => {
    const changes = action.payload.changes;
    return {
      ...store,
      ...changes,
    };
  });
});
