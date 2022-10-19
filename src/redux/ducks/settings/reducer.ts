import { createReducer } from '@reduxjs/toolkit';
import { loadSettingsFailure, loadSettingsSuccess, setSettingsSuccess } from './actions';
import { SettingsState } from './state';

const initialState: SettingsState = {
  loading: true,
  palette: 'light',
  fontSize: '14px',
  padding: '2px',
  noWrap: true,
  defaultOpenMap: {},
  escapeBehavior: 'clear',
};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadSettingsSuccess, (state, action) => {
    const initialSettings = action.payload.settings;
    return {
      ...state,
      ...initialSettings,
      loading: false,
    };
  });

  builder.addCase(loadSettingsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  });

  builder.addCase(setSettingsSuccess, (state, action) => {
    const newSettings = action.payload.settings;
    return {
      ...state,
      ...newSettings,
    };
  });
});
