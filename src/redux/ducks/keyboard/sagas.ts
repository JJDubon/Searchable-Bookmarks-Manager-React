import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { setKeyboardState, setKeyboardStateSuccess, setLinearList, setLinearListSuccess } from './actions';

export function* setKeyboardStateSaga({ payload }: ReturnType<typeof setKeyboardState>) {
  yield put(setKeyboardStateSuccess(payload.changes));
}

export function* setLinearListSaga({ payload }: ReturnType<typeof setLinearList>) {
  const { activeNodes, map, openMap } = payload;
  const list: string[] = [];

  activeNodes.forEach((id) => {
    list.push(id);
    walk(id);
  });

  yield put(setLinearListSuccess(list));

  function walk(nodeId: string) {
    const node = map[nodeId];
    const children = Array(...(node.children ?? []));
    for (const childId of children) {
      list.push(childId);

      const child = map[childId];
      if (child.children && openMap[childId]) {
        walk(childId);
      }
    }
  }
}

export function* keyboardStateSagas() {
  yield takeEvery<ReturnType<typeof setKeyboardState>>('KEYBOARD_STATE_SET', setKeyboardStateSaga);
  yield takeLatest<ReturnType<typeof setLinearList>>('KEYBOARD_LINEAR_LIST_SET', setLinearListSaga);
}
