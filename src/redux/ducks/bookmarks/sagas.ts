import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { createBookmarkMap } from '../../../helpers/BookmarkHelpers';
import { getTree, searchTree } from '../../../helpers/ChromeApiHelpers';
import {
  loadBookmarks,
  loadBookmarksFailure,
  loadBookmarksSuccess,
  resetBookmarks,
  resetBookmarksFailure,
  resetBookmarksSuccess,
  searchBookmarks,
  searchBookmarksFailure,
  searchBookmarksSuccess,
} from './actions';
import { BookmarkTreeNode } from './state';

function* loadBookmarkSaga({ payload }: ReturnType<typeof loadBookmarks>) {
  try {
    const tree: BookmarkTreeNode[] = payload.root ?? (yield call(getTree));
    addBookmarksManagerNode(tree);

    const map = createBookmarkMap(tree);
    const rootNodes = tree[0]?.children?.map((x) => x.id) || [];
    yield put(loadBookmarksSuccess(rootNodes, map));
  } catch (ex) {
    yield put(loadBookmarksFailure());
  }
}

function* loadSearchResults({ payload }: ReturnType<typeof searchBookmarks>) {
  try {
    const nodes: BookmarkTreeNode[] = yield call(searchTree, payload.query);
    const ids = nodes.map((node) => node.id);
    yield put(searchBookmarksSuccess(payload.query, ids));
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
    yield put(resetBookmarksSuccess(rootNodes, map));
  } catch (ex) {
    yield put(resetBookmarksFailure());
  }
}

export function* bookmarksSagas() {
  yield takeEvery<ReturnType<typeof loadBookmarks>>('BOOKMARKS_LOAD', loadBookmarkSaga);
  yield takeLatest<ReturnType<typeof searchBookmarks>>('BOOKMARKS_SEARCH', loadSearchResults);
  yield takeLatest<ReturnType<typeof resetBookmarks>>('BOOKMARKS_RESET', resetBookmarksSaga);
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
