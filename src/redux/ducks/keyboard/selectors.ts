import { useSelector } from 'react-redux';
import { Store } from '../../store';

export function useKeyboardStore() {
  return useSelector((store: Store) => {
    return store.keyboard;
  });
}
