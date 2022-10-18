import { useCallback, useMemo, useRef } from 'react';
import { openInNewTab, openInNewWindow } from '../../helpers/ChromeApiHelpers';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { ActiveBookmarkWrapper } from './active-bookmark-wrapper';
import { BookmarkListItem } from './bookmark-list-item';
import { WithContextMenu } from './ContextMenu';
import { useBookmarkDrag, useBookmarkDrop } from './Drag/utils';
import { BookmarkPrimaryTextOverrides } from './styles';
import { isModifiable } from './utils';

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

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
      if (e.ctrlKey && e.shiftKey) {
        openInNewTab(bookmark.url!, true);
      } else if (e.ctrlKey) {
        openInNewTab(bookmark.url!);
      } else if (e.shiftKey) {
        openInNewWindow(bookmark.url!);
      } else {
        // TODO - open in current tab
      }
    },
    [bookmark.url]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
      if (e.button === 1) {
        openInNewTab(bookmark.url!);
      }
    },
    [bookmark.url]
  );

  return (
    <WithContextMenu bookmark={bookmark}>
      <ActiveBookmarkWrapper id={id}>
        <div ref={ref}>
          <BookmarkListItem
            title={bookmark.title}
            type={'bookmark'}
            indentLevel={indentLevel}
            isDragging={isDragging}
            dropType={dropType}
            isModifiable={isModifiable(bookmark)}
            overrides={overrides}
            src={getFaviconUrl(bookmark.url!)}
            onClick={onClick}
            onMouseUp={onMouseUp}
            hideDetails
          />
        </div>
      </ActiveBookmarkWrapper>
    </WithContextMenu>
  );
};
