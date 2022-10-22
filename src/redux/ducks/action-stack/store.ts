import { FlattenedBookmarkTreeNode } from '../bookmarks/store';

export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export type BookmarkAddAction = {
  type: 'Add';
  bookmark: FlattenedBookmarkTreeNode;
};

export type BookmarkDeleteAction = {
  type: 'Delete';
  bookmark: FlattenedBookmarkTreeNode;
};

export type BookmarkMoveAction = {
  type: 'Move';
  previousBookmark: FlattenedBookmarkTreeNode;
  bookmark: FlattenedBookmarkTreeNode;
};

export type BookmarkChangeAction = {
  type: 'Change';
  previousBookmark: FlattenedBookmarkTreeNode;
  bookmark: FlattenedBookmarkTreeNode;
};

export type BookmarkAction =
  | BookmarkAddAction
  | BookmarkDeleteAction
  | BookmarkMoveAction
  | BookmarkChangeAction;

export interface ActionStackStore {
  stack: BookmarkAction[];
  currentAction: BookmarkAction | null;
}
