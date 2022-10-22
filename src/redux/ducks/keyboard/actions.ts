import { createAction } from '@reduxjs/toolkit';
import { KeyboardStore } from './store';

export const setKeyboardStore = createAction<{ changes: Partial<KeyboardStore> }>('KEYBOARD_STORE_SET');

export const setKeyboardStoreSuccess = createAction<{ changes: Partial<KeyboardStore> }>(
  'KEYBOARD_STORE_SET_SUCCESS'
);
