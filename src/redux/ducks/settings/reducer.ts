import { SettingsActions } from './actions';
import { SettingsState } from './state';

const defaultState: SettingsState = {
  loading: true,
  palette: 'light',
  fontSize: '14px',
  padding: '2px',
  noWrap: true,
  defaultOpenMap: {},
  escapeBehavior: 'clear',
};

export default function reducer(state: SettingsState = defaultState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case 'SETTINGS_LOAD_SUCCESS':
      const initialSettings = action.payload.settings;
      return {
        ...state,
        ...initialSettings,
        loading: false,
      };
    case 'SETTINGS_LOAD_FAILURE':
      return {
        ...state,
        loading: false,
      };
    case 'SETTINGS_SET_SUCCESS':
      const newSettings = action.payload.settings;
      return {
        ...state,
        ...newSettings,
      };
    default:
      return state;
  }
}
