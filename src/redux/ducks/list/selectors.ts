import { useSelector } from 'react-redux';
import { State } from '../../state';

export function useListState() {
  return useSelector((state: State) => {
    return state.list;
  });
}
