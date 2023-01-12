import { useCallback, useEffect, useState } from 'react';
import { useKeyDown, useMouseDown, useMouseMove } from '../../helpers/BrowserHelpers';
import { useRateLimit } from '../../helpers/CallbackHelpers';
import { openInCurrentTab } from '../../helpers/ChromeApiHelpers';
import { useActionsService, useBookmarksService } from '../../providers/ServiceProvider/hooks';
import { useActionsServiceData } from '../../services/ActionsService/hooks';
import { useBookmarksServiceData } from '../../services/BookmarksService/hooks';
import { useContextServiceData } from '../../services/ContextService/hooks';
import { AppDialogs } from '../../services/ContextService/types';
import { inverseAction } from './action-snackbar';

export function useKeyboardNavigation() {
  const actionsService = useActionsService();
  const bookmarksService = useBookmarksService();
  const { activeDialog } = useContextServiceData();
  const { stack } = useActionsServiceData();
  const { map, query, openMap, searchResultsOpenMap, linearList } = useBookmarksServiceData();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const clearActiveIndex = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleKeyboardEv = useRateLimit(
    25,
    useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          if (activeIndex !== null) {
            const path = linearList[activeIndex];
            const id = path.match(/([^/]+$)/)![0];
            const bookmark = map[id];
            if (bookmark.children) {
              const isOpen = (query.length !== 0 ? searchResultsOpenMap : openMap)[path];
              bookmarksService.setOpen(path, !isOpen);
            } else {
              openInCurrentTab(bookmark.url!);
            }
          }
        } else if (e.key === 'ArrowUp') {
          if (activeIndex === 0) {
            setActiveIndex(linearList.length - 1);
          } else {
            setActiveIndex((activeIndex ?? 1) - 1);
          }
        } else if (e.key === 'ArrowDown') {
          if (activeIndex === linearList.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex((activeIndex ?? -1) + 1);
          }
        } else if (e.key === 'z' && e.ctrlKey && query.length === 0) {
          const action = stack[stack.length - 1];
          if (action) {
            inverseAction(action, actionsService);
            actionsService.clearCurrentAction();
          }
        } else {
          clearActiveIndex();
        }
      },
      [
        actionsService,
        activeIndex,
        bookmarksService,
        clearActiveIndex,
        linearList,
        map,
        openMap,
        query.length,
        searchResultsOpenMap,
        stack,
      ]
    )
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeDialog !== AppDialogs.None) {
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }
      handleKeyboardEv(e);
    },
    [activeDialog, handleKeyboardEv]
  );

  useEffect(() => {
    bookmarksService.setActivePath(activeIndex === null ? null : linearList[activeIndex]);
  }, [activeIndex, bookmarksService, linearList]);

  useKeyDown(null, onKeyDown);
  useMouseMove(clearActiveIndex);
  useMouseDown(clearActiveIndex);
}
