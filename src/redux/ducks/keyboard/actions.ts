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

export type KeyboardStateActions =
  | ReturnType<typeof setKeyboardState>
  | ReturnType<typeof setKeyboardStateSuccess>;
