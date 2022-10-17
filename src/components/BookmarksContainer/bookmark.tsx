import { ListItemText } from '@mui/material';
import { useMemo, useRef } from 'react';
import { openInNewTab, openInNewWindow } from '../../helpers/ChromeApiHelpers';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { useBookmarkDrag, useBookmarkDrop } from './drag';
import {
  BookmarkButton,
  BookmarkContainer,
  BookmarkIcon,
  BookmarkImg,
  BookmarkPrimaryTextOverrides,
} from './styles';
import { isModifiable } from './utils';
import { WithContextMenu } from './ContextMenu';

const getFaviconUrl = (url: string, size: number = 32) => {
  return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=${size}`;
};

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
    <WithContextMenu bookmark={bookmark}>
      <BookmarkContainer
        ref={ref}
        type={'bookmark'}
        isDragging={isDragging}
        isModifiable={isModifiable(bookmark)}
        dropType={dropType}
      >
        <BookmarkButton
          component='a'
          sx={{ pl: getIndent(indentLevel) }}
          onClick={(e) => handleClick(e)}
          onMouseUp={(e) => handleAuxClick(e)}
        >
          <BookmarkIcon>
            <BookmarkImg alt={''} src={getFaviconUrl(bookmark.url!)} />
          </BookmarkIcon>
          <ListItemText primary={bookmark.title} primaryTypographyProps={overrides} />
        </BookmarkButton>
      </BookmarkContainer>
    </WithContextMenu>
  );

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (e.ctrlKey && e.shiftKey) {
      openInNewTab(bookmark.url!, true);
    } else if (e.ctrlKey) {
      openInNewTab(bookmark.url!);
    } else if (e.shiftKey) {
      openInNewWindow(bookmark.url!);
    } else {
      // TODO - open in current tab
    }
  }

  function handleAuxClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (e.button === 1) {
      openInNewTab(bookmark.url!);
    }
  }
};
