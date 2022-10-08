import { BookmarkMap } from "./state";

export function loadBookmarks() {
  return { type: "LOAD_BOOKMARKS" as "LOAD_BOOKMARKS" };
}

export function loadBookmarksSuccess(root: string[], map: BookmarkMap) {
  return { 
    type: "LOAD_BOOKMARKS_SUCCESS" as "LOAD_BOOKMARKS_SUCCESS",
    payload: { root, map }
  };
}

export function loadBookmarksFailure() {
  return { type: "LOAD_BOOKMARKS_FAILURE" as "LOAD_BOOKMARKS_FAILURE" };
}

export type BookmarksActions = 
  ReturnType<typeof loadBookmarks> | 
  ReturnType<typeof loadBookmarksSuccess> | 
  ReturnType<typeof loadBookmarksFailure>;
