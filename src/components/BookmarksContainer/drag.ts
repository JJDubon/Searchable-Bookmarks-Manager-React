import { RefObject, useEffect, useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useBookmark, useBookmarksState } from "../../redux/ducks/bookmarks/selectors";
import { BookmarkMap, FlattenedBookmarkTreeNode } from "../../redux/ducks/bookmarks/state";
import { DropType, isModifiable } from "./utils";

export const DragTypes = {
  BOOKMARK: "bookmark"
};

export function useBookmarkDrag(id: string, ref: RefObject<HTMLDivElement>): { 
  isDragging: boolean 
} {
  const bookmark = useBookmark(id);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragTypes.BOOKMARK,
    canDrag: () => isModifiable(bookmark),
    item: () => bookmark,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);
  return { isDragging };
}

// TODO - Functional drop
export function useBookmarkDrop(id: string, ref: RefObject<HTMLDivElement>): { 
  isOver: boolean,
  dropType: DropType
} {
  const { map } = useBookmarksState();
  const [dropType, setDropType] = useState<DropType>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.BOOKMARK,
    canDrop: (item: FlattenedBookmarkTreeNode) => {
      return item.id === id || !isChildOf(map, item.id, id)
    },
    hover: (item: FlattenedBookmarkTreeNode, monitor) => {
      if (!ref.current || id === item.id) {
        setDropType(null);
      } else {
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
        const dropType = getDropType(hoverClientY, hoverMiddleY);
        setDropType(dropType);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [id]);

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

function getDropType(hoverClientY: number, hoverMiddleY: number): DropType {
  const isBottomHalf = hoverClientY > hoverMiddleY;
  const difference = Math.abs(hoverMiddleY - hoverClientY);
  const isCenter = difference <= 7;
  const direction = isBottomHalf ? 'bottom' : 'top';
  return (isCenter ? direction + '-center' : direction) as DropType;
}
