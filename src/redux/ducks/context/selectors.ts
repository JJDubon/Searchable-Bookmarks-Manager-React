import { useSelector } from 'react-redux';
import { State } from '../../state';

export function useContextState() {
  return useSelector((state: State) => {
    return state.context;
  });
}
