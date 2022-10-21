import { createAction } from '@reduxjs/toolkit';
import { BookmarkAction } from './state';

export const addAction = createAction<{ action: BookmarkAction; showSnackbar?: boolean }>('ACTION_STACK_ADD');

export const addActionSuccess = createAction<{ action: BookmarkAction; showSnackbar?: boolean }>(
  'ACTION_STACK_ADD_SUCCESS'
);

export const popAction = createAction('ACTION_STACK_POP');

export const popActionSuccess = createAction('ACTION_STACK_POP_SUCCESS');

export const clearStackAction = createAction('ACTION_STACK_CLEAR');

export const clearStackActionSuccess = createAction('ACTION_STACK_CLEAR_SUCCESS');
