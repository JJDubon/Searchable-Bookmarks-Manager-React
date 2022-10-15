import { CSSProperties, useMemo } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { FlattenedBookmarkTreeNode } from '../../redux/ducks/bookmarks/state';
import { BookmarkSwitch } from './bookmark-switch';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
};

function getItemStyles(
  initialCursorOffset: XYCoord | null,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset || !initialCursorOffset) {
    return {
      display: 'none',
    };
  }

  const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x);
  const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y);
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

export const BookmarkDragPreview = () => {
  const { item, isDragging, initialCursorOffset, initialFileOffset, currentFileOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem() as FlattenedBookmarkTreeNode,
      itemType: monitor.getItemType(),
      initialCursorOffset: monitor.getInitialClientOffset(),
      initialFileOffset: monitor.getInitialSourceClientOffset(),
      currentFileOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  const itemStyles = useMemo(() => {
    return getItemStyles(initialCursorOffset, initialFileOffset, currentFileOffset);
  }, [currentFileOffset, initialCursorOffset, initialFileOffset]);

  if (!isDragging) {
    return <></>;
  }

  return (
    <div style={layerStyles}>
      <div style={itemStyles}>
        <BookmarkSwitch id={item.id} indentLevel={0} defaultOpen={false} hideDetails />
      </div>
    </div>
  );
};
