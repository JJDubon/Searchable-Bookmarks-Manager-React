import { useSelector } from 'react-redux';
import { State } from '../../state';

export function useKeyboardState() {
  return useSelector((state: State) => {
    return state.keyboard;
  });
}
