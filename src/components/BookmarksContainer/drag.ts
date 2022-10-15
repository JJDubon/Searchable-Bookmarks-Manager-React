import { RefObject, useState } from "react";
import { ConnectDragPreview, useDrag, useDrop, XYCoord } from "react-dnd";
import { useBookmark } from "../../redux/ducks/bookmarks/selectors";
import { FlattenedBookmarkTreeNode } from "../../redux/ducks/bookmarks/state";

export type DropType = 'bottom' | 'top' | 'bottom-center' | 'top-center' | null;

export const DragTypes = {
  BOOKMARK: "bookmark"
};

// TODO - Better drag preview - Preferably a copy of the element in a portal
export function useBookmarkDrag(id: string, ref: RefObject<HTMLDivElement>): { 
  preview: ConnectDragPreview, 
  isDragging: boolean 
} {
  const bookmark = useBookmark(id);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragTypes.BOOKMARK,
    canDrag: () => bookmark.parentId !== "0",
    item: () => bookmark,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  drag(ref);
  return { preview, isDragging };
}

// TODO - Functional drop
export function useBookmarkDrop(id: string, ref: RefObject<HTMLDivElement>): { 
  isOver: boolean,
  dropType: DropType
} {
  const [dropType, setDropType] = useState<DropType>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.BOOKMARK,
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

function getDropType(hoverClientY: number, hoverMiddleY: number): DropType {
  const isBottomHalf = hoverClientY > hoverMiddleY;
  const difference = Math.abs(hoverMiddleY - hoverClientY);
  const isCenter = difference <= 6;
  const direction = isBottomHalf ? 'bottom' : 'top';
  return (isCenter ? direction + '-center' : direction) as DropType;
}
