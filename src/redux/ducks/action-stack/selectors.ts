import { useSelector } from 'react-redux';
import { State } from '../../state';

export function useActionStack() {
  return useSelector((state: State) => {
    return state.actionStack;
  });
}
