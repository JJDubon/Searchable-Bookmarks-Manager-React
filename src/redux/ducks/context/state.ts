import { FlattenedBookmarkTreeNode } from '../bookmarks/state';

export enum AppDialogs {
  None,
  AddBookmark,
  EditBookmark,
  AddFolder,
  EditFolder,
}

export interface ContextState {
  open: boolean;
  bookmark: FlattenedBookmarkTreeNode | null;
  x: number;
  y: number;
  activeDialog: AppDialogs;
}
