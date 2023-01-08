import { ActionStackStore } from './ducks/action-stack/store';
import { ContextStore } from './ducks/context/store';

export interface Store {
  context: ContextStore;
  actionStack: ActionStackStore;
}
