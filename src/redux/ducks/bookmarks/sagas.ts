import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { createBookmarkMap, createOpenMap, toLinearList } from '../../../helpers/BookmarkHelpers';
import { getTree, searchTree } from '../../../helpers/ChromeApiHelpers';
import { State } from '../../state';
import { setKeyboardState } from '../keyboard/actions';
import {
  bookmarksUpdated,
  bookmarksUpdatedSuccess,
  loadBookmarks,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  resetBookmarks,
  resetBookmarksFailure,
  resetBookmarksSuccess,
  searchBookmarks,
  searchBookmarksFailure,
  searchBookmarksSuccess,
  setBookmarkOpen,
  setBookmarkOpenSuccess,
} from './actions';
import { BookmarkTreeNode } from './state';

function* loadBookmarkSaga({ payload }: ReturnType<typeof loadBookmarks>) {
  try {
    const defaultOpenMap = ((yield select()) as State).settings.defaultOpenMap;
    const tree: BookmarkTreeNode[] = payload.root ?? (yield call(getTree));
    addBookmarksManagerNode(tree);

    const map = createBookmarkMap(tree);
    const rootNodes = tree[0]?.children?.map((x) => x.id) || [];
    yield put(loadBookmarksSuccess({ root: rootNodes, map }));
    yield put(bookmarksUpdated({ defaultOpenMap }));
  } catch (ex) {
    yield put(loadBookmarksFailure());
  }
}

function* loadSearchResults({ payload }: ReturnType<typeof searchBookmarks>) {
  try {
    const nodes: BookmarkTreeNode[] = yield call(searchTree, payload.query);
    const ids = nodes.map((node) => node.id);
    yield put(searchBookmarksSuccess({ query: payload.query, results: ids }));
    yield put(bookmarksUpdated({}));
  } catch (ex) {
    yield put(searchBookmarksFailure());
  }
}

function* resetBookmarksSaga() {
  try {
    const tree: BookmarkTreeNode[] = yield call(getTree);
    addBookmarksManagerNode(tree);

    const rootNodes = tree[0]?.children?.map((x) => x.id) || [];
    const map = createBookmarkMap(tree);
    yield put(resetBookmarksSuccess({ root: rootNodes, map }));
  } catch (ex) {
    yield put(resetBookmarksFailure());
  }
}

function* setBookmarksOpenSaga({ payload }: ReturnType<typeof setBookmarkOpen>) {
  yield put(setBookmarkOpenSuccess(payload));
  yield put(bookmarksUpdated({}));
}

function* bookmarksUpdatedSaga({ payload }: ReturnType<typeof bookmarksUpdated>) {
  const state = (yield select()) as State;
  const { activeNodes, map, query, openMap, searchResultsOpenMap } = state.bookmarks;
  if (query && query.length !== 0) {
    let newSearchResultsOpenMap = createOpenMap(activeNodes, map, searchResultsOpenMap);
    yield put(
      bookmarksUpdatedSuccess({
        openMap,
        searchResultsOpenMap: newSearchResultsOpenMap,
      })
    );
    yield put(
      setKeyboardState({ changes: { linearList: toLinearList(activeNodes, map, newSearchResultsOpenMap) } })
    );
  } else {
    let newOpenMap = createOpenMap(activeNodes, map, openMap, payload.defaultOpenMap);
    yield put(
      bookmarksUpdatedSuccess({
        openMap: newOpenMap,
        searchResultsOpenMap: {},
      })
    );
    yield put(setKeyboardState({ changes: { linearList: toLinearList(activeNodes, map, newOpenMap) } }));
  }
}

export function* bookmarksSagas() {
  yield takeEvery<ReturnType<typeof loadBookmarks>>('BOOKMARKS_LOAD', loadBookmarkSaga);
  yield takeLatest<ReturnType<typeof searchBookmarks>>('BOOKMARKS_SEARCH', loadSearchResults);
  yield takeLatest<ReturnType<typeof resetBookmarks>>('BOOKMARKS_RESET', resetBookmarksSaga);
  yield takeLatest<ReturnType<typeof setBookmarkOpen>>('BOOKMARKS_SET_OPEN', setBookmarksOpenSaga);
  yield takeLatest<ReturnType<typeof bookmarksUpdated>>('BOOKMARKS_UPDATED', bookmarksUpdatedSaga);
}

function addBookmarksManagerNode(root: BookmarkTreeNode[]) {
  if (root && root[0]) {
    const rootNode = root[0];
    rootNode.children?.push({
      id: '__bookmarks-manager',
      index: rootNode.children.length,
      title: 'Bookmarks Manager',
      url: 'chrome://bookmarks/',
      unmodifiable: 'managed',
    });
  }
}
