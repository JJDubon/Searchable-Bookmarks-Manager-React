import * as muiColors from '@mui/material/colors';
import { FolderColor } from '../services/SettingsService/types';

export function getMuiColor(color: FolderColor | null | undefined) {
  switch (color) {
    case FolderColor.Amber:
      return muiColors.amber;
    case FolderColor.Blue:
      return muiColors.blue;
    case FolderColor.Brown:
      return muiColors.brown;
    case FolderColor.Cyan:
      return muiColors.cyan;
    case FolderColor.Green:
      return muiColors.green;
    case FolderColor.Indigo:
      return muiColors.indigo;
    case FolderColor.Lime:
      return muiColors.lime;
    case FolderColor.Orange:
      return muiColors.orange;
    case FolderColor.Pink:
      return muiColors.pink;
    case FolderColor.Purple:
      return muiColors.purple;
    case FolderColor.Red:
      return muiColors.red;
    case FolderColor.Teal:
      return muiColors.teal;
    case FolderColor.Yellow:
      return muiColors.yellow;

    default:
    case FolderColor.Grey:
      return muiColors.grey;
  }
}
