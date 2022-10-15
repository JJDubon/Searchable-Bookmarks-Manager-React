import { FlattenedBookmarkTreeNode } from '../bookmarks/state';

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

export type ContextStateActions =
  | ReturnType<typeof setContextMenuOpen>
  | ReturnType<typeof setContextMenuOpenSuccess>
  | ReturnType<typeof setContextMenuClose>
  | ReturnType<typeof setContextMenuCloseSuccess>;
