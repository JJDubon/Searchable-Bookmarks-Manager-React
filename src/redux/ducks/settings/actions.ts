import { createAction } from '@reduxjs/toolkit';
import { SettingsState } from './state';

export const loadSettings = createAction<{ settings?: SettingsState }>('SETTINGS_LOAD');

export const loadSettingsSuccess = createAction<{ settings: SettingsState }>('SETTINGS_LOAD_SUCCESS');

export const loadSettingsFailure = createAction('SETTINGS_LOAD_FAILURE');

export const getSettings = createAction('SETTINGS_GET');

export const setSettings = createAction<{ settings: Partial<SettingsState> }>('SETTINGS_SET');

export const setSettingsSuccess = createAction<{ settings: Partial<SettingsState> }>('SETTINGS_SET_SUCCESS');

export const setSettingsFailure = createAction('SETTINGS_SET_FAILURE');
