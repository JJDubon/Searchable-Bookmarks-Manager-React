import { createReducer } from '@reduxjs/toolkit';
import { setKeyboardStateSuccess } from './actions';
import { KeyboardState } from './state';

const initialState: KeyboardState = {
  activeNode: null,
  linearList: [],
};

export const keyboardReducer = createReducer(initialState, (builder) => {
  builder.addCase(setKeyboardStateSuccess, (state, action) => {
    const changes = action.payload.changes;
    return {
      ...state,
      ...changes,
    };
  });
});
