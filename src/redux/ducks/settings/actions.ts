import { createAction } from '@reduxjs/toolkit';
import { SettingsStore } from './store';

export const loadSettings = createAction<{ settings?: SettingsStore }>('SETTINGS_LOAD');

export const loadSettingsSuccess = createAction<{ settings: SettingsStore }>('SETTINGS_LOAD_SUCCESS');

export const loadSettingsFailure = createAction('SETTINGS_LOAD_FAILURE');

export const getSettings = createAction('SETTINGS_GET');

export const setSettings = createAction<{ settings: Partial<SettingsStore> }>('SETTINGS_SET');

export const setSettingsSuccess = createAction<{ settings: Partial<SettingsStore> }>('SETTINGS_SET_SUCCESS');

export const setSettingsFailure = createAction('SETTINGS_SET_FAILURE');
