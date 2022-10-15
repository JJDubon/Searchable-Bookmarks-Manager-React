export const SettingsStateKeys: (keyof SettingsState)[] = ['fontSize', 'padding', 'noWrap'];

export interface SettingsState {
  loading: boolean;
  fontSize: string;
  padding: string;
  noWrap: boolean;
}
