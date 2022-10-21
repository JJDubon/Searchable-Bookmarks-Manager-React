import { ActionStackState } from './ducks/action-stack/state';
import { BookmarksState } from './ducks/bookmarks/state';
import { ContextState } from './ducks/context/state';
import { KeyboardState } from './ducks/keyboard/state';
import { SettingsState } from './ducks/settings/state';

export interface State {
  bookmarks: BookmarksState;
  settings: SettingsState;
  context: ContextState;
  keyboard: KeyboardState;
  actionStack: ActionStackState;
}
