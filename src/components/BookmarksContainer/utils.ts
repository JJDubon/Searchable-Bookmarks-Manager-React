import { useMemo } from 'react';
import { createOpenMap, toLinearList } from '../../helpers/BookmarkHelpers';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { FlattenedBookmarkTreeNode } from '../../redux/ducks/bookmarks/state';
import { useListState } from '../../redux/ducks/list/selectors';
import { OpenMap } from '../../redux/ducks/list/state';
import { useSettings } from '../../redux/ducks/settings/selectors';

export type BookmarkType = 'folder' | 'bookmark';

export type DropType = 'bottom' | 'top' | 'bottom-center' | 'top-center' | null;

export function useOpenMap(): OpenMap {
  const { defaultOpenMap } = useSettings();
  const { openMap } = useListState();
  const { activeNodes } = useBookmarksState();
  return useMemo(() => {
    return createOpenMap(defaultOpenMap, openMap, activeNodes);
  }, [activeNodes, defaultOpenMap, openMap]);
}

export function useOpenStatus(id: string): boolean {
  const openMap = useOpenMap();
  return openMap[id];
}

// TODO - If there is a search query this needs to work differently
// TODO - Like if a search result appears twice in the search results both will be highlighted
// TODO - Don't know what to do about that yet
export function useLinearBookmarkList(): string[] {
  const { activeNodes, map } = useBookmarksState();
  const openMap = useOpenMap();
  return useMemo(() => {
    return toLinearList(activeNodes, map, openMap);
  }, [activeNodes, map, openMap]);
}

export function isRootNode(bookmark: FlattenedBookmarkTreeNode): boolean {
  return bookmark.parentId === '0';
}

export function isModifiable(bookmark: FlattenedBookmarkTreeNode): boolean {
  return !isRootNode(bookmark) && !bookmark.unmodifiable;
}

export function getDropBehavior(
  type: BookmarkType,
  isModifiable: boolean,
  isOpen: boolean,
  dropType: DropType
): 'above' | 'below' | 'inside' | null {
  if (type === 'folder') {
    if (!isModifiable) {
      return dropType === null ? null : 'inside';
    } else if (isOpen) {
      switch (dropType) {
        case 'top':
          return 'above';
        case 'bottom':
        case 'top-center':
        case 'bottom-center':
          return 'inside';
        default:
          return null;
      }
    } else {
      switch (dropType) {
        case 'top':
          return 'above';
        case 'bottom':
          return 'below';
        case 'top-center':
        case 'bottom-center':
          return 'inside';
        default:
          return null;
      }
    }
  } else {
    switch (dropType) {
      case 'top':
      case 'top-center':
        return 'above';
      case 'bottom':
      case 'bottom-center':
        return 'below';
      default:
        return null;
    }
  }
}
