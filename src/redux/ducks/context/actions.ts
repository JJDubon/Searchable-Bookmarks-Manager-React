import { FlattenedBookmarkTreeNode } from '../bookmarks/state';
import { AppDialogs } from './state';

export function setContextMenuOpen(bookmark: FlattenedBookmarkTreeNode, x: number, y: number) {
  return {
    type: 'CONTEXT_MENU_OPEN' as 'CONTEXT_MENU_OPEN',
    payload: { bookmark, x, y },
  };
}

export function setContextMenuOpenSuccess(bookmark: FlattenedBookmarkTreeNode, x: number, y: number) {
  return {
    type: 'CONTEXT_MENU_OPEN_SUCCESS' as 'CONTEXT_MENU_OPEN_SUCCESS',
    payload: { bookmark, x, y },
  };
}

export function setContextMenuClose() {
  return {
    type: 'CONTEXT_MENU_CLOSE' as 'CONTEXT_MENU_CLOSE',
  };
}

export function setContextMenuCloseSuccess() {
  return {
    type: 'CONTEXT_MENU_CLOSE_SUCCESS' as 'CONTEXT_MENU_CLOSE_SUCCESS',
  };
}

export function setActiveDialog(dialog: AppDialogs) {
  return {
    type: 'CONTEXT_SET_ACTIVE_DIALOG' as 'CONTEXT_SET_ACTIVE_DIALOG',
    payload: { dialog },
  };
}

export function setActiveDialogSuccess(dialog: AppDialogs) {
  return {
    type: 'CONTEXT_SET_ACTIVE_DIALOG_SUCCESS' as 'CONTEXT_SET_ACTIVE_DIALOG_SUCCESS',
    payload: { dialog },
  };
}

export type ContextStateActions =
  | ReturnType<typeof setContextMenuOpen>
  | ReturnType<typeof setContextMenuOpenSuccess>
  | ReturnType<typeof setContextMenuClose>
  | ReturnType<typeof setContextMenuCloseSuccess>
  | ReturnType<typeof setActiveDialog>
  | ReturnType<typeof setActiveDialogSuccess>;
