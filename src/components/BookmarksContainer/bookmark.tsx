import { ListItemText } from '@mui/material';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { useAppSettings } from '../../providers/SettingsProvider';
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
  const { fontSize } = useAppSettings();
  const bookmark = map[id];
  return (
    <BookmarkButton component="a" sx={{ pl: getIndent(indentLevel) }}>
      <BookmarkIcon>
        <BookmarkImg alt={''} src={getFaviconUrl(bookmark.url!)} />
      </BookmarkIcon>
      <ListItemText primary={bookmark.title} primaryTypographyProps={{fontSize: fontSize, marginTop: "1px"}} />
    </BookmarkButton>
  );
}