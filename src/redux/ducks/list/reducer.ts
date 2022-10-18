import { ListStateActions } from './actions';
import { ListState } from './state';

const defaultState: ListState = {
  openMap: {},
};

export default function reducer(state: ListState = defaultState, action: ListStateActions): ListState {
  switch (action.type) {
    case 'LIST_STATE_SET_SUCCESS':
      const changes = action.payload.changes;
      return {
        ...state,
        ...changes,
      };
    case 'LIST_STATE_SET_OPEN_SUCCESS':
      const openMap = state.openMap;
      return {
        ...state,
        openMap: {
          ...openMap,
          [action.payload.id]: action.payload.open,
        },
      };
    default:
      return state;
  }
}
