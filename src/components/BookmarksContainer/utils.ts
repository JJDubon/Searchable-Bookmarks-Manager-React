import { useMemo } from 'react';
import { useBookmarksServiceData } from '../../services/BookmarksService/hooks';
import { FlattenedBookmarkTreeNode, OpenMap } from '../../services/BookmarksService/types';
import { useSettings } from '../../services/SettingsService/hooks';
import { BookmarkPrimaryTextOverrides } from './styles';

export type BookmarkType = 'folder' | 'bookmark';

export type DropType = 'bottom' | 'top' | 'bottom-center' | 'top-center' | null;

export function useOpenMap(): OpenMap {
  const { query, openMap, searchResultsOpenMap } = useBookmarksServiceData();
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
  const { lineHeight, fontSize, noWrap } = useSettings();
  return useMemo(() => {
    return BookmarkPrimaryTextOverrides(lineHeight, fontSize, noWrap);
  }, [lineHeight, fontSize, noWrap]);
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
