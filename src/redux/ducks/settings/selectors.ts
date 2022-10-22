import { useSelector } from 'react-redux';
import { Store } from '../../store';

export function useSettingsStore() {
  return useSelector((store: Store) => {
    return store.settings;
  });
}
