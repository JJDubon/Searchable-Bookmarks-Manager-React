import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { createBookmarkMap } from '../../../helpers/BookmarkHelpers';
import { getTree, searchTree } from '../../../helpers/ChromeApiHelpers';
import {
  loadBookmarksFailure,
  loadBookmarksSuccess,
  searchBookmarks,
  searchBookmarksFailure,
  searchBookmarksSuccess,
} from './actions';
import { BookmarkTreeNode } from './state';

function* loadBookmarkSaga() {
  try {
    const tree: BookmarkTreeNode[] = yield call(getTree);
    const map = createBookmarkMap(tree);
    yield put(loadBookmarksSuccess(tree[0]?.children?.map((x) => x.id) || [], map));
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

export function* bookmarksSagas() {
  yield takeEvery('BOOKMARKS_LOAD', loadBookmarkSaga);
  yield takeLatest('BOOKMARKS_SEARCH', loadSearchResults);
}
