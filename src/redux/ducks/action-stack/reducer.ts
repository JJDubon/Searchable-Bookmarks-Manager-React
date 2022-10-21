import { createReducer } from '@reduxjs/toolkit';
import { addActionSuccess, clearStackActionSuccess, popActionSuccess } from './actions';
import { ActionStackState } from './state';

const initialState: ActionStackState = {
  stack: [],
  currentAction: null,
};

export const actionStackReducer = createReducer(initialState, (builder) => {
  builder.addCase(addActionSuccess, (state, action) => {
    return {
      ...state,
      actions: [action.payload.action, ...state.stack],
      currentAction: action.payload.showSnackbar ? action.payload.action : null,
    };
  });

  builder.addCase(popActionSuccess, (state, action) => {
    const bookmarkAction = state.stack[state.stack.length - 1];
    state.stack.pop();
    return {
      ...state,
      stack: state.stack,
      currentAction: bookmarkAction,
    };
  });

  builder.addCase(clearStackActionSuccess, (state, action) => {
    return {
      ...state,
      currentAction: null,
    };
  });
});
