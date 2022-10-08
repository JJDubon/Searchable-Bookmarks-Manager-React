import { ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { BookmarkButton, BookmarkIcon, BookmarkImg, BookmarkPrimaryTextOverrides } from './styles';

const getFaviconUrl = (url: string) => {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

interface BookmarksProps {
  id: string;
  indentLevel: number;
}

export const Bookmark = ({ id, indentLevel }: BookmarksProps) => {
  const bookmark = useBookmark(id);
  const { fontSize, noWrap } = useSettings();
  const overrides = useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);
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