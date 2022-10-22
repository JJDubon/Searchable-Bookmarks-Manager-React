import { ActionStackStore } from './ducks/action-stack/store';
import { BookmarksStore } from './ducks/bookmarks/store';
import { ContextStore } from './ducks/context/store';
import { KeyboardStore } from './ducks/keyboard/store';
import { SettingsStore } from './ducks/settings/store';

export interface Store {
  bookmarks: BookmarksStore;
  settings: SettingsStore;
  context: ContextStore;
  keyboard: KeyboardStore;
  actionStack: ActionStackStore;
}
