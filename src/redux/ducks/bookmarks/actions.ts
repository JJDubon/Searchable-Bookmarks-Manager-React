import { BookmarkMap } from './state';

export function loadBookmarks() {
  return { type: 'BOOKMARKS_LOAD' as 'BOOKMARKS_LOAD' };
}

export function loadBookmarksSuccess(root: string[], map: BookmarkMap) {
  return {
    type: 'BOOKMARKS_LOAD_SUCCESS' as 'BOOKMARKS_LOAD_SUCCESS',
    payload: { root, map },
  };
}

export function loadBookmarksFailure() {
  return { type: 'BOOKMARKS_LOAD_FAILURE' as 'BOOKMARKS_LOAD_FAILURE' };
}

export function searchBookmarks(query: string) {
  return {
    type: 'BOOKMARKS_SEARCH' as 'BOOKMARKS_SEARCH',
    payload: { query },
  };
}

export function searchBookmarksSuccess(query: string, results: string[]) {
  return {
    type: 'BOOKMARKS_SEARCH_SUCCESS' as 'BOOKMARKS_SEARCH_SUCCESS',
    payload: { query, results },
  };
}

export function searchBookmarksFailure() {
  return { type: 'BOOKMARKS_SEARCH_FAILURE' as 'BOOKMARKS_SEARCH_FAILURE' };
}

export type BookmarksActions =
  | ReturnType<typeof loadBookmarks>
  | ReturnType<typeof loadBookmarksSuccess>
  | ReturnType<typeof loadBookmarksFailure>
  | ReturnType<typeof searchBookmarks>
  | ReturnType<typeof searchBookmarksSuccess>
  | ReturnType<typeof searchBookmarksFailure>;
