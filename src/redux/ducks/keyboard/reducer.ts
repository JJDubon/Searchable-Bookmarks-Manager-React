import { KeyboardStateActions } from './actions';
import { KeyboardState } from './state';

const defaultState: KeyboardState = {
  activeNode: null,
  linearNodes: [],
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
    case 'KEYBOARD_LINEAR_LIST_SET_SUCCESS':
      return {
        ...state,
        linearNodes: action.payload.list,
      };
    default:
      return state;
  }
}
