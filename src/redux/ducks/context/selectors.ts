import { useSelector } from 'react-redux';
import { Store } from '../../store';

export function useContextStore() {
  return useSelector((store: Store) => {
    return store.context;
  });
}
