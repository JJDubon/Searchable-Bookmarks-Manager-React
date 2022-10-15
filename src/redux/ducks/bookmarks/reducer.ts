import { BookmarksActions } from './actions';
import { BookmarksState } from './state';

const defaultState: BookmarksState = {
  loading: true,
  root: [],
  rootNodes: [],
  activeNodes: [],
  map: {},
  query: '',
};

export default function reducer(state: BookmarksState = defaultState, action: BookmarksActions) {
  switch (action.type) {
    case 'BOOKMARKS_LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        root: action.payload.root,
        rootNodes: action.payload.root,
        activeNodes: action.payload.root,
        map: action.payload.map,
      };
    case 'BOOKMARKS_LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        root: [],
        activeNodes: [],
        map: {},
      };
    case 'BOOKMARKS_SEARCH_SUCCESS':
      const queryExists = action.payload.query && action.payload.query.length !== 0;
      return {
        ...state,
        query: action.payload.query,
        activeNodes: queryExists ? action.payload.results : state.rootNodes,
      };
    case 'BOOKMARKS_SEARCH_FAILURE':
      return {
        ...state,
        activeNodes: state.rootNodes,
      };
    default:
      return state;
  }
}
