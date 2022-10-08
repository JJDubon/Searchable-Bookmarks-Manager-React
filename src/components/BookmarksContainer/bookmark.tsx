import TabIcon from '@mui/icons-material/Tab';
import { ListItemText } from '@mui/material';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { Folder } from './folder';
import { BookmarkButton, BookmarkIcon } from './styles';

interface BookmarksProps {
  id: string;
  indentLevel: number;
}

export const Bookmark = ({ id, indentLevel }: BookmarksProps) => {
  const { map } = useBookmarks();
  const bookmark = map[id];
  if (bookmark.children) {
    return (
      <Folder id={bookmark.id} indentLevel={indentLevel} />
    );
  } else {
    return (
      <BookmarkButton sx={{ pl: getIndent(indentLevel) }}>
        <BookmarkIcon>
          <TabIcon />
        </BookmarkIcon>
        <ListItemText primary={bookmark.title} />
      </BookmarkButton>
    );
  }
}