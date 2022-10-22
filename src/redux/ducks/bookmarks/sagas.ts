import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { createBookmarkMap, createOpenMap, toLinearList } from '../../../helpers/BookmarkHelpers';
import { getTree, searchTree } from '../../../helpers/ChromeApiHelpers';
import { Store } from '../../store';
import { setKeyboardStore } from '../keyboard/actions';
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
import { BookmarkTreeNode } from './store';

function* loadBookmarkSaga({ payload }: ReturnType<typeof loadBookmarks>) {
  try {
    const defaultOpenMap = ((yield select()) as Store).settings.defaultOpenMap;
    const tree: BookmarkTreeNode[] = payload.root ?? (yield call(getTree));
    addBookmarksManagerNode(tree);

    const map = createBookmarkMap(tree);
    const rootNodes = tree[0]?.children?.map((x) => x.id) || [];
    yield put(loadBookmarksSuccess({ root: rootNodes, map }));

    // Unless otherwise set, root nodes should be open by default
    const openMap = { ...defaultOpenMap };
    rootNodes.forEach((nodeId) => {
      if (openMap[nodeId] === undefined) {
        openMap[nodeId] = true;
      }
    });

    yield put(bookmarksUpdated({ defaultOpenMap: openMap }));
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
    yield put(bookmarksUpdated({}));
  } catch (ex) {
    yield put(resetBookmarksFailure());
  }
}

function* setBookmarksOpenSaga({ payload }: ReturnType<typeof setBookmarkOpen>) {
  yield put(setBookmarkOpenSuccess(payload));
  yield put(bookmarksUpdated({}));
}

function* bookmarksUpdatedSaga({ payload }: ReturnType<typeof bookmarksUpdated>) {
  const store = (yield select()) as Store;
  const { activeNodes, map, query, openMap, searchResultsOpenMap } = store.bookmarks;
  if (query && query.length !== 0) {
    let newSearchResultsOpenMap = createOpenMap(activeNodes, map, searchResultsOpenMap);
    yield put(
      bookmarksUpdatedSuccess({
        openMap,
        searchResultsOpenMap: newSearchResultsOpenMap,
      })
    );
    yield put(
      setKeyboardStore({ changes: { linearList: toLinearList(activeNodes, map, newSearchResultsOpenMap) } })
    );
  } else {
    let newOpenMap = createOpenMap(activeNodes, map, openMap, payload.defaultOpenMap);
    yield put(
      bookmarksUpdatedSuccess({
        openMap: newOpenMap,
        searchResultsOpenMap: {},
      })
    );
    yield put(setKeyboardStore({ changes: { linearList: toLinearList(activeNodes, map, newOpenMap) } }));
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
