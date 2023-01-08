import { createAction } from '@reduxjs/toolkit';
import { FlattenedBookmarkTreeNode } from '../../../apis/BookmarksApi/types';
import { AppDialogs } from './store';

export const setContextMenuOpen = createAction<{
  path: string;
  bookmark: FlattenedBookmarkTreeNode;
  x: number;
  y: number;
}>('CONTEXT_MENU_OPEN');

export const setContextMenuOpenSuccess = createAction<{
  path: string;
  bookmark: FlattenedBookmarkTreeNode;
  x: number;
  y: number;
}>('CONTEXT_MENU_OPEN_SUCCESS');

export const setContextMenuClose = createAction('CONTEXT_MENU_CLOSE');

export const setContextMenuCloseSuccess = createAction('CONTEXT_MENU_CLOSE_SUCCESS');

export const setActiveDialog = createAction<{ dialog: AppDialogs }>('CONTEXT_SET_ACTIVE_DIALOG');

export const setActiveDialogSuccess = createAction<{ dialog: AppDialogs }>(
  'CONTEXT_SET_ACTIVE_DIALOG_SUCCESS'
);
