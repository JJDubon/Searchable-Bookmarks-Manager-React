import { useSelector } from 'react-redux';
import { Store } from './store';

export function useAppStore() {
  return useSelector((store: Store) => {
    return store;
  });
}
export function useAppIsLoading() {
  const store = useAppStore();
  return !!(store?.settings?.loading === true || store?.bookmarks?.loading === true);
}
