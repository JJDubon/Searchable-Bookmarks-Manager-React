import { FlattenedBookmarkTreeNode } from '../../redux/ducks/bookmarks/state';
import { useAppState } from '../../redux/selectors';

export type BookmarkType = 'folder' | 'bookmark';

export type DropType = 'bottom' | 'top' | 'bottom-center' | 'top-center' | null;

export function useOpenStatus(id: string): boolean {
  const state = useAppState();
  const { defaultOpenMap } = state.settings;
  const { openMap } = state.list;
  const folder = state.bookmarks.map[id];
  const isRootNode = folder.parentId === '0';
  if (defaultOpenMap[folder.id] !== undefined || openMap[folder.id] !== undefined) {
    return defaultOpenMap[folder.id] || openMap[folder.id];
  } else {
    return isRootNode;
  }
}

export function isModifiable(bookmark: FlattenedBookmarkTreeNode): boolean {
  return bookmark.parentId !== '0';
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
