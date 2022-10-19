import { createAction } from '@reduxjs/toolkit';
import { KeyboardState } from './state';

export const setKeyboardState = createAction<{ changes: Partial<KeyboardState> }>('KEYBOARD_STATE_SET');

export const setKeyboardStateSuccess = createAction<{ changes: Partial<KeyboardState> }>(
  'KEYBOARD_STATE_SET_SUCCESS'
);
