import { SettingsActions } from './actions';
import { SettingsState } from './state';

const defaultState: SettingsState = {
  loading: true,
  palette: 'light',
  fontSize: '14px',
  padding: '2px',
  noWrap: true,
  defaultOpenMap: {},
};

export default function reducer(state: SettingsState = defaultState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case 'SETTINGS_LOAD_SUCCESS':
      return {
        ...state,
        ...action.payload.settings,
        loading: false,
      };
    case 'SETTINGS_LOAD_FAILURE':
      return {
        ...state,
        loading: false,
      };
    case 'SETTINGS_SET_SUCCESS':
      return {
        ...state,
        ...action.payload.settings,
      };
    default:
      return state;
  }
}
