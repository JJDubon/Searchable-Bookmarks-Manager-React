import { BookmarksState } from './ducks/bookmarks/state';
import { SettingsState } from './ducks/settings/state';

export interface State {
  bookmarks: BookmarksState;
  settings: SettingsState;
}
