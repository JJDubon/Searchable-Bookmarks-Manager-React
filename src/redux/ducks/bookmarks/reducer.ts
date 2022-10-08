import { BookmarksActions } from "./actions";
import { BookmarksState } from "./state"

const defaultState: BookmarksState = {
  loading: true,
  root: [],
  activeNodes: [],
  map: {}
};

export default function reducer(state: BookmarksState = defaultState, action: BookmarksActions) {
  switch (action.type) {
    case 'BOOKMARKS_LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        root: action.payload.root,
        activeNodes: action.payload.root,
        map: action.payload.map,
      }
    case 'BOOKMARKS_LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        root: [],
        activeNodes: [],
        map: {},
      }
    default:
      return state
  }
}
