import { BookmarksState } from './ducks/bookmarks/state';
import { ContextState } from './ducks/context/state';
import { ListState } from './ducks/list/state';
import { SettingsState } from './ducks/settings/state';

export interface State {
  bookmarks: BookmarksState;
  settings: SettingsState;
  list: ListState;
  context: ContextState;
}
