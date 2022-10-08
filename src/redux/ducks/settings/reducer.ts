import { SettingsActions } from "./actions";
import { SettingsState } from "./state";

const defaultState: SettingsState = {
  loading: true,
  fontSize: "14px",
  padding: "2px",
  noWrap: true,
};

export default function reducer(state: SettingsState = defaultState, action: SettingsActions) {
  console.log({state, action});
  switch (action.type) {
    case 'SETTINGS_LOAD_SUCCESS':
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    case 'SETTINGS_LOAD_FAILURE':
      return {
        ...state,
        loading: false
      }
    case 'SETTINGS_SET_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
