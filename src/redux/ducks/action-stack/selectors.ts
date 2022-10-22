import { useSelector } from 'react-redux';
import { Store } from '../../store';

export function useActionStackStore() {
  return useSelector((store: Store) => {
    return store.actionStack;
  });
}
