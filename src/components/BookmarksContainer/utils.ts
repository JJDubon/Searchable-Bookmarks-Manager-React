import { FlattenedBookmarkTreeNode } from "../../redux/ducks/bookmarks/state";

export function isModifiable(bookmark: FlattenedBookmarkTreeNode): boolean {
  return bookmark.parentId !== "0";
}