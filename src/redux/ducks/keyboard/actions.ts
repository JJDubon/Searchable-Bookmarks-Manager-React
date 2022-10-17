import { BookmarkMap } from '../bookmarks/state';
import { KeyboardState } from './state';

export function setKeyboardState(changes: Partial<KeyboardState>) {
  return {
    type: 'KEYBOARD_STATE_SET' as 'KEYBOARD_STATE_SET',
    payload: { changes },
  };
}

export function setKeyboardStateSuccess(changes: Partial<KeyboardState>) {
  return {
    type: 'KEYBOARD_STATE_SET_SUCCESS' as 'KEYBOARD_STATE_SET_SUCCESS',
    payload: { changes },
  };
}

export function setLinearList(activeNodes: string[], map: BookmarkMap, openMap: { [id: string]: boolean }) {
  return {
    type: 'KEYBOARD_LINEAR_LIST_SET' as 'KEYBOARD_LINEAR_LIST_SET',
    payload: { activeNodes, map, openMap },
  };
}

export function setLinearListSuccess(list: string[]) {
  return {
    type: 'KEYBOARD_LINEAR_LIST_SET_SUCCESS' as 'KEYBOARD_LINEAR_LIST_SET_SUCCESS',
    payload: { list },
  };
}

export type KeyboardStateActions =
  | ReturnType<typeof setKeyboardState>
  | ReturnType<typeof setKeyboardStateSuccess>
  | ReturnType<typeof setLinearList>
  | ReturnType<typeof setLinearListSuccess>;
