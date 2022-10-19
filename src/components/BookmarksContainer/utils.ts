import { useMemo } from 'react';
import { createOpenMap, toLinearList } from '../../helpers/BookmarkHelpers';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { FlattenedBookmarkTreeNode } from '../../redux/ducks/bookmarks/state';
import { useListState } from '../../redux/ducks/list/selectors';
import { OpenMap } from '../../redux/ducks/list/state';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { BookmarkPrimaryTextOverrides } from './styles';

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

export function useListItemOverrides() {
  const { fontSize, noWrap } = useSettings();
  return useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);
}

// TODO - Turn off the hover effect since it is broken in the browser?

// TODO - Maybe instead of having a "Drag" folder we have a utils folder with an index.tsx that exports each
//        sub item. So Utils/index.tsx exports from drag.tsx and listener.tsx, etc

// TODO - If there is a search query this needs to work differently
// TODO - Like if a search result appears twice in the search results both will be highlighted
// TODO - Don't know what to do about that yet
// TODO - Move the open map back into the state? How will that work for keyboard nav?
// TODO - I mean the open map code is awful
// TODO - Maybe this is a good use of context? We can just provide the index as well?
// TODO - Also a good place to move linear nodes, since that code is messy
// TODO - No, move it to the state and have some kind of action listener
// TODO - So like have a "useKeyboardEvent" hook that has a custom event
// TODO - Maybe the useKeyboardEvent hook uses a context provider, that could work
// TODO - Or maybe we use prop-drilling to build a path and send that value up to the context, then
//        the linear list is built from the sorted version of that list. We can also kill active-bookmark-
//        wrapper as well if we do this
// TODO - I don't see any way around this when considering search
// TODO - But why use context instead of redux? Might be easier to just build a map in redux
// TODO - Might make memoization easier. Improve performance maybe? idk.
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
