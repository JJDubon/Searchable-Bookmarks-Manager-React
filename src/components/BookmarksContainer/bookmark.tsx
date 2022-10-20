import { useCallback, useRef } from 'react';
import { openInNewTab, openInNewWindow } from '../../helpers/ChromeApiHelpers';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
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
  const ref = useRef<HTMLDivElement>(null);
  const bookmark = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, ref);
  const { dropType } = useBookmarkDrop(id, ref);
  const overrides = useListItemOverrides();

  path = `${path}/${id}`;

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
            hideDetails
          />
        </div>
      </ActiveBookmarkWrapper>
    </WithContextMenu>
  );
};
