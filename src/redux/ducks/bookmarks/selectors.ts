import { useSelector } from "react-redux";
import { State } from "../../state";

export function useBookmarksState() {
  return useSelector((state: State) => {
    return state.bookmarks;
  });
}

export function useBookmark(id: string) {
  return useBookmarksState().map[id];
}
