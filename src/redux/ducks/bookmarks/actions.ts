import { createAction } from '@reduxjs/toolkit';
import { BookmarkMap, BookmarkTreeNode, OpenMap } from './state';

export const loadBookmarks = createAction<{ root?: BookmarkTreeNode[] }>('BOOKMARKS_LOAD');

export const loadBookmarksSuccess = createAction<{ root: string[]; map: BookmarkMap }>(
  'BOOKMARKS_LOAD_SUCCESS'
);

export const loadBookmarksFailure = createAction('BOOKMARKS_LOAD_FAILURE');

export const searchBookmarks = createAction<{ query: string }>('BOOKMARKS_SEARCH');

export const searchBookmarksSuccess = createAction<{ query: string; results: string[] }>(
  'BOOKMARKS_SEARCH_SUCCESS'
);

export const searchBookmarksFailure = createAction('BOOKMARKS_SEARCH_FAILURE');

export const resetBookmarks = createAction('BOOKMARKS_RESET');

export const resetBookmarksSuccess = createAction<{ root: string[]; map: BookmarkMap }>(
  'BOOKMARKS_RESET_SUCCESS'
);

export const resetBookmarksFailure = createAction('BOOKMARKS_RESET_FAILURE');

export const bookmarksUpdated = createAction<{ previousQuery: string; defaultOpenMap?: OpenMap }>(
  'BOOKMARKS_UPDATED'
);

export const bookmarksUpdatedSuccess = createAction<{ openMap: OpenMap; searchResultsOpenMap: OpenMap }>(
  'BOOKMARKS_UPDATED_SUCCESS'
);

export const setBookmarkOpen = createAction<{ path: string; open: boolean }>('BOOKMARKS_SET_OPEN');

export const setBookmarkOpenSuccess = createAction<{ path: string; open: boolean }>(
  'BOOKMARKS_SET_OPEN_SUCCESS'
);
