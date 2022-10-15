import { ListStateActions } from './actions';
import { ListState } from './state';

const defaultState: ListState = {
  openMap: {},
};

export default function reducer(state: ListState = defaultState, action: ListStateActions) {
  console.log('test', state, action);
  switch (action.type) {
    case 'LIST_STATE_SET_SUCCESS':
      return {
        ...state,
        ...action.payload.changes,
      };
    case 'LIST_STATE_SET_OPEN_SUCCESS':
      return {
        ...state,
        openMap: {
          ...state.openMap,
          [action.payload.id]: action.payload.open,
        },
      };
    default:
      return state;
  }
}
