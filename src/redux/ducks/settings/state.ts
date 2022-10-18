import { PaletteMode } from '@mui/material';

export const SettingsStateKeys: (keyof SettingsState)[] = [
  'palette',
  'fontSize',
  'padding',
  'noWrap',
  'defaultOpenMap',
  'escapeBehavior',
];

export interface SettingsState {
  loading: boolean;
  palette: PaletteMode;
  fontSize: string;
  padding: string;
  noWrap: boolean;
  escapeBehavior: 'clear' | 'close';
  defaultOpenMap: { [id: string]: boolean };
}
