import { useCallback, useRef } from 'react';
import { useBookmark } from '../../services/BookmarksService/hooks';
import { openInCurrentTab, openInNewTab, openInNewWindow } from '../../helpers/ChromeApiHelpers';
import { ActiveBookmarkWrapper } from './active-bookmark-wrapper';
import { BookmarkListItem } from './bookmark-list-item';
import { WithContextMenu } from './ContextMenu';
import { useBookmarkDrag, useBookmarkDrop } from './Drag/utils';
import { isModifiable, useListItemOverrides } from './utils';

interface BookmarksProps {
  id: string;
  path: string;
  indentLevel: number;
}

export const Bookmark = ({ id, path, indentLevel }: BookmarksProps) => {
  path = `${path}/${id}`;

  const ref = useRef<HTMLDivElement>(null);
  const bookmark = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, path, ref);
  const { dropType } = useBookmarkDrop(id, path, ref);
  const overrides = useListItemOverrides();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
      if (e.ctrlKey && e.shiftKey) {
        openInNewTab(bookmark.url!, true);
      } else if (e.ctrlKey) {
        openInNewTab(bookmark.url!);
      } else if (e.shiftKey) {
        openInNewWindow(bookmark.url!);
      } else {
        openInCurrentTab(bookmark.url!);
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

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => {
    if (e.button === 1) {
      e.preventDefault();
      return false;
    }
  }, []);

  return (
    <WithContextMenu path={path} bookmark={bookmark}>
      <ActiveBookmarkWrapper path={path}>
        <div ref={ref}>
          <BookmarkListItem
            title={bookmark.title}
            type={'bookmark'}
            indentLevel={indentLevel}
            isDragging={isDragging}
            dropType={dropType}
            isModifiable={isModifiable(bookmark)}
            overrides={overrides}
            src={bookmark.url!}
            onClick={onClick}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            hideDetails
          />
        </div>
      </ActiveBookmarkWrapper>
    </WithContextMenu>
  );
};
