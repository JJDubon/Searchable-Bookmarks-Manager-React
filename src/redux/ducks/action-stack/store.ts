import { BookmarkTreeNode } from '../../../services/BookmarksService/types';

export type BookmarkAddAction = {
  type: 'Add';
  bookmark: BookmarkTreeNode;
};

export type BookmarkDeleteAction = {
  type: 'Delete';
  bookmark: BookmarkTreeNode;
};

export type BookmarkMoveAction = {
  type: 'Move';
  previousBookmark: BookmarkTreeNode;
  bookmark: BookmarkTreeNode;
};

export type BookmarkChangeAction = {
  type: 'Change';
  previousBookmark: BookmarkTreeNode;
  bookmark: BookmarkTreeNode;
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
