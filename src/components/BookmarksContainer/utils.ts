import { useMemo } from 'react';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { FlattenedBookmarkTreeNode, OpenMap } from '../../redux/ducks/bookmarks/state';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { BookmarkPrimaryTextOverrides } from './styles';

export type BookmarkType = 'folder' | 'bookmark';

export type DropType = 'bottom' | 'top' | 'bottom-center' | 'top-center' | null;

export function useOpenMap(): OpenMap {
  const { query, openMap, searchResultsOpenMap } = useBookmarksState();
  if (query) {
    return searchResultsOpenMap;
  } else {
    return openMap;
  }
}

export function useOpenStatus(path: string): boolean {
  const openMap = useOpenMap();
  return openMap[path];
}

export function useListItemOverrides() {
  const { fontSize, noWrap } = useSettings();
  return useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);
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
