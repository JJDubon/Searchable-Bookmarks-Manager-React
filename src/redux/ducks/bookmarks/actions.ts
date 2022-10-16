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

export function resetBookmarks() {
  return {
    type: 'BOOKMARKS_RESET' as 'BOOKMARKS_RESET',
  };
}

export function resetBookmarksSuccess(root: string[], map: BookmarkMap) {
  return {
    type: 'BOOKMARKS_RESET_SUCCESS' as 'BOOKMARKS_RESET_SUCCESS',
    payload: { root, map },
  };
}

export function resetBookmarksFailure() {
  return { type: 'BOOKMARKS_RESET_FAILURE' as 'BOOKMARKS_RESET_FAILURE' };
}

export type BookmarksActions =
  | ReturnType<typeof loadBookmarks>
  | ReturnType<typeof loadBookmarksSuccess>
  | ReturnType<typeof loadBookmarksFailure>
  | ReturnType<typeof searchBookmarks>
  | ReturnType<typeof searchBookmarksSuccess>
  | ReturnType<typeof searchBookmarksFailure>
  | ReturnType<typeof resetBookmarks>
  | ReturnType<typeof resetBookmarksSuccess>
  | ReturnType<typeof resetBookmarksFailure>;
