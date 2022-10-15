export const SettingsStateKeys: (keyof SettingsState)[] = ['fontSize', 'padding', 'noWrap', 'defaultOpenMap'];

export interface SettingsState {
  loading: boolean;
  fontSize: string;
  padding: string;
  noWrap: boolean;
  defaultOpenMap: { [id: string]: boolean };
}
