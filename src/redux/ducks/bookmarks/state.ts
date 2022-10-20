export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export interface FlattenedBookmarkTreeNode extends Omit<BookmarkTreeNode, 'children'> {
  children?: string[];
}

export interface BookmarkMap {
  [id: string]: FlattenedBookmarkTreeNode;
}

export interface OpenMap {
  [path: string]: boolean;
}

export interface BookmarksState {
  loading: boolean;
  root: string[];
  rootNodes: string[];
  activeNodes: string[];
  map: BookmarkMap;
  query: string;
  openMap: OpenMap;
  searchResultsOpenMap: OpenMap;
}
