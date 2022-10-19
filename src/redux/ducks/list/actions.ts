import { createAction } from '@reduxjs/toolkit';
import { ListState } from './state';

export const setListState = createAction<{ changes: Partial<ListState> }>('LIST_STATE_SET');

export const setListStateSuccess = createAction<{ changes: Partial<ListState> }>('LIST_STATE_SET_SUCCESS');

export const setListItemOpen = createAction<{ id: string; open: boolean }>('LIST_STATE_SET_OPEN');

export const setListItemOpenSuccess = createAction<{ id: string; open: boolean }>(
  'LIST_STATE_SET_OPEN_SUCCESS'
);
