import { useSelector } from 'react-redux';
import { Store } from '../../store';

export function useBookmarksStore() {
  return useSelector((store: Store) => {
    return store.bookmarks;
  });
}

export function useBookmark(id: string) {
  return useBookmarksStore().map[id];
}
