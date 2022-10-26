import { PaletteMode } from '@mui/material';
import { OpenMap } from '../bookmarks/store';

export const SettingsStoreKeys: (keyof SettingsStore)[] = [
  'palette',
  'iconColor',
  'fontSize',
  'lineHeight',
  'noWrap',
  'defaultOpenMap',
  'escapeBehavior',
];

export interface SettingsStore {
  loading: boolean;
  palette: PaletteMode;
  iconColor: string;
  fontSize: string;
  lineHeight: string;
  noWrap: boolean;
  escapeBehavior: 'clear' | 'close';
  defaultOpenMap: OpenMap;
}
