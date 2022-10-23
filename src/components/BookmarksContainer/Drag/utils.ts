import { RefObject, useEffect, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { getBookmark, moveBookmark } from '../../../helpers/ChromeApiHelpers';
import { pushAction } from '../../../redux/ducks/action-stack/actions';
import { setBookmarkOpen } from '../../../redux/ducks/bookmarks/actions';
import { useBookmark, useBookmarksStore } from '../../../redux/ducks/bookmarks/selectors';
import { BookmarkMap, FlattenedBookmarkTreeNode } from '../../../redux/ducks/bookmarks/store';
import { DropType, getDropBehavior, isModifiable, useOpenMap } from '../utils';

export const DragTypes = {
  BOOKMARK: 'bookmark',
};

export interface DragItem {
  bookmark: FlattenedBookmarkTreeNode;
  path: string;
}

export function useBookmarkDrag(
  id: string,
  path: string,
  ref: RefObject<HTMLDivElement>
): {
  isDragging: boolean;
} {
  const bookmark = useBookmark(id);
  const { query } = useBookmarksStore();
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DragTypes.BOOKMARK,
      canDrag: () => isModifiable(bookmark) && query.trim().length === 0,
      item: () => ({ bookmark, path }),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, path, ref.current]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);
  return { isDragging };
}

export function useBookmarkDrop(
  id: string,
  path: string,
  ref: RefObject<HTMLDivElement>
): {
  isOver: boolean;
  dropType: DropType;
} {
  const dispatch = useDispatch();
  const { map } = useBookmarksStore();
  const openMap = useOpenMap();
  const open = openMap[path];
  const [dropType, setDropType] = useState<DropType>(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.BOOKMARK,
      canDrop: ({ bookmark }: DragItem) => {
        return !isChildOf(map, bookmark.id, id);
      },
      hover: ({ bookmark }: DragItem, monitor) => {
        if (!ref.current || id === bookmark.id) {
          setDropType(null);
        } else {
          const dropType = calculateDropType(ref.current, monitor);
          setDropType(dropType);
        }
      },
      drop: ({ bookmark: dragItem, path: dragItemPath }: DragItem, monitor) => {
        if (ref.current && dragItem.id !== id) {
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

          if (openMap[dragItemPath]) {
            dispatch(setBookmarkOpen({ path: dragItemPath, open: false }));
          }

          let newParentId;
          let newIndex;
          switch (behavior) {
            case 'above':
              newParentId = targetFolder.id;
              newIndex = dropIndex!;
              break;
            case 'below':
              newParentId = targetFolder.id;
              newIndex = dropIndex! + 1;
              break;
            case 'inside':
              newParentId = dropItem.id;
              newIndex = 0;
              break;
          }

          let previousBookmarkIndexAdjustment = 0;
          if (newParentId === dragItem.parentId && newIndex !== undefined && newIndex < dragItem.index!) {
            previousBookmarkIndexAdjustment = 1;
          }

          if (newParentId !== undefined && newIndex !== undefined) {
            (async function () {
              const oldBookmarkNode = await getBookmark(dragItem.id);
              await moveBookmark(dragItem.id, newParentId, newIndex);
              const newBookmarkNode = await getBookmark(dragItem.id);

              dispatch(
                pushAction({
                  showSnackbar: false,
                  action: {
                    type: 'Move',
                    previousBookmark: {
                      ...oldBookmarkNode,
                      index: dragItem.index! + previousBookmarkIndexAdjustment,
                    },
                    bookmark: newBookmarkNode,
                  },
                })
              );
            })();
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [id, map, path, open]
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
