import { BookmarkMap } from "./state";

export function loadBookmarks() {
  return { type: "BOOKMARKS_LOAD" as "BOOKMARKS_LOAD" };
}

export function loadBookmarksSuccess(root: string[], map: BookmarkMap) {
  return { 
    type: "BOOKMARKS_LOAD_SUCCESS" as "BOOKMARKS_LOAD_SUCCESS",
    payload: { root, map }
  };
}

export function loadBookmarksFailure() {
  return { type: "BOOKMARKS_LOAD_FAILURE" as "BOOKMARKS_LOAD_FAILURE" };
}

export type BookmarksActions = 
  ReturnType<typeof loadBookmarks> | 
  ReturnType<typeof loadBookmarksSuccess> | 
  ReturnType<typeof loadBookmarksFailure>;
