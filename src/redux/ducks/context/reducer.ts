import { ContextStateActions } from './actions';
import { AppDialogs, ContextState } from './state';

const defaultState: ContextState = {
  open: false,
  bookmark: null,
  x: 0,
  y: 0,
  activeDialog: AppDialogs.None,
};

export default function reducer(
  state: ContextState = defaultState,
  action: ContextStateActions
): ContextState {
  switch (action.type) {
    case 'CONTEXT_MENU_OPEN_SUCCESS':
      return {
        ...state,
        open: true,
        x: action.payload.x,
        y: action.payload.y,
        bookmark: action.payload.bookmark,
      };
    case 'CONTEXT_MENU_CLOSE_SUCCESS':
      return {
        ...state,
        open: false,
      };
    case 'CONTEXT_SET_ACTIVE_DIALOG_SUCCESS':
      return {
        ...state,
        activeDialog: action.payload.dialog,
      };
    default:
      return state;
  }
}
