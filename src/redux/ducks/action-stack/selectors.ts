import { useSelector } from 'react-redux';
import { State } from '../../state';

export function useActionStackState() {
  return useSelector((state: State) => {
    return state.actionStack;
  });
}
