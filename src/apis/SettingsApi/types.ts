import { PaletteMode } from '@mui/material';
import { OpenMap } from '../BookmarksApi/types';

export const SettingsKeys: (keyof Settings)[] = [
  'palette',
  'iconColor',
  'fontSize',
  'lineHeight',
  'noWrap',
  'defaultOpenMap',
  'escapeBehavior',
];

export interface Settings {
  loading: boolean;
  palette: PaletteMode;
  iconColor: string;
  fontSize: string;
  lineHeight: string;
  noWrap: boolean;
  escapeBehavior: 'clear' | 'close';
  defaultOpenMap: OpenMap;
}
