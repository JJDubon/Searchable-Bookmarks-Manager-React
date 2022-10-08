import { call, put, takeEvery } from 'redux-saga/effects';
import { createBookmarkMap } from '../../../helpers/BookmarkHelpers';
import { getTree } from '../../../helpers/ChromeApiHelpers';
import { loadBookmarksFailure, loadBookmarksSuccess } from './actions';
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

export function* bookmarksSagas() {
  yield takeEvery("BOOKMARKS_LOAD", loadBookmarkSaga);
}
