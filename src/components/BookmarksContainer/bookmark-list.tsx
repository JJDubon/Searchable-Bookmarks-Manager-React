import { List } from '@mui/material';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { Bookmark } from './bookmark';
import { Folder } from './folder';

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
  const { map } = useBookmarks();
  return (
    <List disablePadding>
      {ids.map(id => {
        const node = map[id];
        if (node.children) {
          return <Folder key={id} id={id} indentLevel={indentLevel} defaultOpen={defaultOpen} />
        } else {
          return <Bookmark key={id} id={id} indentLevel={indentLevel} />
        }
      })}
    </List>
  );
}