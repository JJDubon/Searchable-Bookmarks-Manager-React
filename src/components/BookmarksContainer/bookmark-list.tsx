import { List } from '@mui/material';
import { BookmarkSwitch } from './bookmark-switch';

interface BookmarksListProps {
  ids: string[];
  path: string;
  indentLevel?: number;
}

export const BookmarksList = ({ ids, path, indentLevel = 0 }: BookmarksListProps) => {
  return (
    <List disablePadding>
      {ids.map((id, index) => (
        <BookmarkSwitch key={id} id={id} path={path + `[${index}]`} indentLevel={indentLevel} />
      ))}
    </List>
  );
};
