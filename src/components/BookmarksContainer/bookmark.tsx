import { ListItemText } from '@mui/material';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { BookmarkButton, BookmarkIcon, BookmarkImg } from './styles';

const getFaviconUrl = (url: string) => {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

interface BookmarksProps {
  id: string;
  indentLevel: number;
}

export const Bookmark = ({ id, indentLevel }: BookmarksProps) => {
  const { map } = useBookmarks();
  const bookmark = map[id];
  return (
    <BookmarkButton sx={{ pl: getIndent(indentLevel) }}>
      <BookmarkIcon>
        <BookmarkImg alt={''} src={getFaviconUrl(bookmark.url!)} />
      </BookmarkIcon>
      <ListItemText primary={bookmark.title} />
    </BookmarkButton>
  );
}