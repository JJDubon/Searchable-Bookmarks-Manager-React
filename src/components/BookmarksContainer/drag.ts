import { RefObject, useEffect, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { moveBookmark } from '../../helpers/ChromeApiHelpers';
import { useBookmark, useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { BookmarkMap, FlattenedBookmarkTreeNode } from '../../redux/ducks/bookmarks/state';
import { DropType, getDropBehavior, isModifiable, useOpenStatus } from './utils';

export const DragTypes = {
  BOOKMARK: 'bookmark',
};

export function useBookmarkDrag(
  id: string,
  ref: RefObject<HTMLDivElement>
): {
  isDragging: boolean;
} {
  const bookmark = useBookmark(id);
  const { query } = useBookmarksState();
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragTypes.BOOKMARK,
    canDrag: () => isModifiable(bookmark) && query.trim().length === 0,
    item: () => bookmark,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);
  return { isDragging };
}

export function useBookmarkDrop(
  id: string,
  ref: RefObject<HTMLDivElement>
): {
  isOver: boolean;
  dropType: DropType;
} {
  const open = useOpenStatus(id);
  const { map } = useBookmarksState();
  const [dropType, setDropType] = useState<DropType>(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.BOOKMARK,
      canDrop: (dragItem: FlattenedBookmarkTreeNode) => {
        return dragItem.id === id || !isChildOf(map, dragItem.id, id);
      },
      hover: (dragItem: FlattenedBookmarkTreeNode, monitor) => {
        if (!ref.current || id === dragItem.id) {
          setDropType(null);
        } else {
          const dropType = calculateDropType(ref.current, monitor);
          setDropType(dropType);
        }
      },
      drop: (dragItem: FlattenedBookmarkTreeNode, monitor) => {
        if (ref.current) {
          const dropItem = map[id];
          const targetFolder = map[dropItem.parentId!];
          const dropIndex = targetFolder.children?.indexOf(dropItem.id);
          const dropType = calculateDropType(ref.current, monitor);
          const behavior = getDropBehavior(
            dropItem.children ? 'folder' : 'bookmark',
            isModifiable(dropItem),
            open,
            dropType
          );

          switch (behavior) {
            case 'above':
              moveBookmark(dragItem.id, targetFolder.id, dropIndex!);
              break;
            case 'below':
              moveBookmark(dragItem.id, targetFolder.id, dropIndex! + 1);
              break;
            case 'inside':
              moveBookmark(dragItem.id, dropItem.id, 0);
              break;
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [id, map, open]
  );

  drop(ref);
  return {
    isOver,
    dropType: isOver ? dropType : null,
  };
}

function isChildOf(map: BookmarkMap, dragId: string, targetId: string): boolean {
  let current = targetId as string | undefined;
  while (current && map[current]) {
    if (map[current].id === dragId) {
      return true;
    }

    current = map[current].parentId;
  }

  return false;
}

function calculateDropType(
  current: HTMLDivElement,
  monitor: DropTargetMonitor<FlattenedBookmarkTreeNode, unknown>
) {
  const hoverBoundingRect = current?.getBoundingClientRect();
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
  return getDropType(hoverClientY, hoverMiddleY);
}

function getDropType(hoverClientY: number, hoverMiddleY: number): DropType {
  const isBottomHalf = hoverClientY > hoverMiddleY;
  const difference = Math.abs(hoverMiddleY - hoverClientY);
  const isCenter = difference <= 7;
  const direction = isBottomHalf ? 'bottom' : 'top';
  return (isCenter ? direction + '-center' : direction) as DropType;
}
