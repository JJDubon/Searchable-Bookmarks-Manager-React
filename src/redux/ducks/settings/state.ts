import { PaletteMode } from '@mui/material';
import { OpenMap } from '../bookmarks/state';

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
  defaultOpenMap: OpenMap;
}
