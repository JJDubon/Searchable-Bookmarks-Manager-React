import { PaletteMode } from '@mui/material';

export const SettingsStateKeys: (keyof SettingsState)[] = [
  'palette',
  'fontSize',
  'padding',
  'noWrap',
  'defaultOpenMap',
];

export interface SettingsState {
  loading: boolean;
  palette: PaletteMode;
  fontSize: string;
  padding: string;
  noWrap: boolean;
  defaultOpenMap: { [id: string]: boolean };
}
