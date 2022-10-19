import { createReducer } from '@reduxjs/toolkit';
import { setListItemOpenSuccess, setListStateSuccess } from './actions';
import { ListState } from './state';

const initialState: ListState = {
  openMap: {},
};

export const listReducer = createReducer(initialState, (builder) => {
  builder.addCase(setListStateSuccess, (state, action) => {
    const changes = action.payload.changes;
    return {
      ...state,
      ...changes,
    };
  });

  builder.addCase(setListItemOpenSuccess, (state, action) => {
    const openMap = state.openMap;
    return {
      ...state,
      openMap: {
        ...openMap,
        [action.payload.id]: action.payload.open,
      },
    };
  });
});
