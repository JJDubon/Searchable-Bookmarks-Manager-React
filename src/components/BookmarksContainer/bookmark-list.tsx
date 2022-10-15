import { List } from '@mui/material';
import { BookmarkSwitch } from './bookmark-switch';

interface BookmarksListProps {
  ids: string[];
  indentLevel?: number;
  defaultOpen?: boolean;
}

export const BookmarksList = ({ 
  ids, 
  indentLevel = 0,
  defaultOpen = false,
}: BookmarksListProps) => {
  return (
    <List disablePadding>
      {ids.map(id => (
        <BookmarkSwitch 
          key={id} 
          id={id} 
          indentLevel={indentLevel} 
          defaultOpen={defaultOpen} 
        />)
      )}
    </List>
  );
}