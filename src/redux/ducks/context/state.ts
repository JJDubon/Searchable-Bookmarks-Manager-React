import { FlattenedBookmarkTreeNode } from '../bookmarks/state';

export enum AppDialogs {
  None,
  AddBookmark,
  EditBookmark,
  AddFolder,
  EditFolder,
  DeleteBookmark,
}

export interface ContextState {
  open: boolean;
  path: string;
  bookmark: FlattenedBookmarkTreeNode | null;
  x: number;
  y: number;
  activeDialog: AppDialogs;
}
