import { FlattenedBookmarkTreeNode } from '../bookmarks/state';

export interface ContextState {
  open: boolean;
  bookmark: FlattenedBookmarkTreeNode | null;
  x: number;
  y: number;
}
