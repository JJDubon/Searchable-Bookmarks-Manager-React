import { createReducer } from '@reduxjs/toolkit';
import { addActionSuccess, clearCurrentActionSuccess, popActionSuccess } from './actions';
import { ActionStackState } from './state';

const initialState: ActionStackState = {
  stack: [],
  currentAction: null,
};

export const actionStackReducer = createReducer(initialState, (builder) => {
  builder.addCase(addActionSuccess, (state, action) => {
    state.stack.push(action.payload.action);
    state.currentAction = action.payload.showSnackbar ? action.payload.action : null;
    return state;
  });

  builder.addCase(popActionSuccess, (state, action) => {
    state.stack.pop();
  });

  builder.addCase(clearCurrentActionSuccess, (state, action) => {
    state.currentAction = null;
  });
});
