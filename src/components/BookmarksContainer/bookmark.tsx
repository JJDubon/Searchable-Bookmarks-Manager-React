import { ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { useAppSettings } from '../../providers/SettingsProvider';
import { BookmarkButton, BookmarkIcon, BookmarkImg, BookmarkPrimaryTextOverrides } from './styles';

const getFaviconUrl = (url: string) => {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

interface BookmarksProps {
  id: string;
  indentLevel: number;
}

export const Bookmark = ({ id, indentLevel }: BookmarksProps) => {
  const { map } = useBookmarks();
  const { fontSize, noWrap } = useAppSettings();
  const overrides = useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);
  const bookmark = map[id];
  return (
    <BookmarkButton component="a" sx={{ pl: getIndent(indentLevel) }}>
      <BookmarkIcon>
        <BookmarkImg alt={''} src={getFaviconUrl(bookmark.url!)} />
      </BookmarkIcon>
      <ListItemText
        primary={bookmark.title}
        primaryTypographyProps={overrides} />
    </BookmarkButton>
  );
}