import { BookmarksActions } from "./actions";
import { BookmarksState } from "./state"

const defaultState: BookmarksState = {
  loading: true,
  root: [],
  map: {}
};

export default function reducer(state: BookmarksState = defaultState, action: BookmarksActions) {
  switch (action.type) {
    case 'LOAD_BOOKMARKS_SUCCESS':
      return {
        ...state,
        loading: false,
        root: action.payload.root,
        map: action.payload.map,
      }
    case 'LOAD_BOOKMARKS_FAILURE':
      return {
        ...state,
        loading: false,
        root: [],
        map: {},
      }
    default:
      return state
  }
}
