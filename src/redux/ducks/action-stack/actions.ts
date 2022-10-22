import { createAction } from '@reduxjs/toolkit';
import { BookmarkAction, BookmarkTreeNode } from './store';

export const pushAction = createAction<{ action: BookmarkAction; showSnackbar?: boolean }>(
  'ACTION_STACK_PUSH'
);

export const pushActionSuccess = createAction<{ action: BookmarkAction; showSnackbar?: boolean }>(
  'ACTION_STACK_PUSH_SUCCESS'
);

export const popAction = createAction('ACTION_STACK_POP');

export const popActionSuccess = createAction('ACTION_STACK_POP_SUCCESS');

export const clearCurrentAction = createAction('ACTION_STACK_CURRENT_CLEAR');

export const clearCurrentActionSuccess = createAction('ACTION_STACK_CURRENT_CLEAR_SUCCESS');

export const mapActionStackItem = createAction<{ id: string; newNode: BookmarkTreeNode }>('ACTION_STACK_MAP');

export const mapActionStackItemSuccess = createAction<{ id: string; newNode: BookmarkTreeNode }>(
  'ACTION_STACK_MAP_SUCCESS'
);
