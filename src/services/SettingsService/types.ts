import { PaletteMode } from '@mui/material';
import { OpenMap } from '../BookmarksService/types';

export const SettingsKeys: (keyof Settings)[] = [
  'palette',
  'iconColor',
  'fontSize',
  'lineHeight',
  'noWrap',
  'defaultOpenMap',
  'escapeBehavior',
  'colorMap',
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
  colorMap: ColorMap;
}

export enum FolderColor {
  Amber = 'Amber',
  Blue = 'Blue',
  Brown = 'Brown',
  Cyan = 'Cyan',
  Green = 'Green',
  Grey = 'Grey',
  Indigo = 'Indigo',
  Lime = 'Lime',
  Orange = 'Orange',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  Teal = 'Teal',
  Yellow = 'Yellow',
}

export interface ColorMap {
  [id: string]: FolderColor | undefined;
}
