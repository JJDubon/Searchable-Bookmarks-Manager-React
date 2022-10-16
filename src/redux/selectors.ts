import { useSelector } from 'react-redux';
import { State } from './state';

export function useAppState() {
  return useSelector((state: State) => {
    return state;
  });
}

export function useAppIsLoading() {
  const state = useAppState();
  return !!(state?.settings?.loading === true || state?.bookmarks?.loading === true);
}
