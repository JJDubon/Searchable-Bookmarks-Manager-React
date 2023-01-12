import { FlattenedBookmarkTreeNode } from '../../../services/BookmarksService/types';

export enum AppDialogs {
  None,
  AddBookmark,
  EditBookmark,
  AddFolder,
  EditFolder,
  DeleteBookmark,
}

export interface ContextStore {
  open: boolean;
  path: string;
  bookmark: FlattenedBookmarkTreeNode | null;
  x: number;
  y: number;
  activeDialog: AppDialogs;
}
