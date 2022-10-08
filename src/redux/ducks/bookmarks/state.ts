export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export interface FlattenedBookmarkTreeNode extends Omit<BookmarkTreeNode, "children"> {
  children?: string[];
}

export interface BookmarkMap {
  [id: string]: FlattenedBookmarkTreeNode
}

export interface BookmarksState {
  loading: boolean;
  root: string[];
  map: BookmarkMap;
}
