import { KeyboardStateActions } from './actions';
import { KeyboardState } from './state';

const defaultState: KeyboardState = {
  activeNode: null,
};

export default function reducer(
  state: KeyboardState = defaultState,
  action: KeyboardStateActions
): KeyboardState {
  switch (action.type) {
    case 'KEYBOARD_STATE_SET_SUCCESS':
      const changes = action.payload.changes;
      return {
        ...state,
        ...changes,
      };
    default:
      return state;
  }
}
