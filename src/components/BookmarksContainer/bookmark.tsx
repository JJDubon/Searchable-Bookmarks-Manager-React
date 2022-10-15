import { ListItemText } from '@mui/material';
import { useMemo, useRef } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { useBookmarkDrag, useBookmarkDrop } from './drag';
import { BookmarkButton, BookmarkContainer, BookmarkIcon, BookmarkImg, BookmarkPrimaryTextOverrides } from './styles';

const getFaviconUrl = (url: string, size: number = 32) => {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=${size}`;
}

interface BookmarksProps {
  id: string;
  indentLevel: number;
}

export const Bookmark = ({ id, indentLevel }: BookmarksProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const bookmark = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, ref);
  const { dropType } = useBookmarkDrop(id, ref);
  const { fontSize, noWrap } = useSettings();
  const overrides = useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);

  return (
    <BookmarkContainer ref={ref} type={'bookmark'} isDragging={isDragging} dropType={dropType}>
      <BookmarkButton component="a" sx={{ pl: getIndent(indentLevel) }}>
        <BookmarkIcon>
          <BookmarkImg alt={''} src={getFaviconUrl(bookmark.url!)} />
        </BookmarkIcon>
        <ListItemText
          primary={bookmark.title}
          primaryTypographyProps={overrides} />
      </BookmarkButton>
    </BookmarkContainer>
  );
}