import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKeyDown, useMouseDown, useMouseMove } from '../../helpers/BrowserHelpers';
import { useRateLimit } from '../../helpers/CallbackHelpers';
import { openInCurrentTab } from '../../helpers/ChromeApiHelpers';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { useContextState } from '../../redux/ducks/context/selectors';
import { AppDialogs } from '../../redux/ducks/context/state';
import { setKeyboardState } from '../../redux/ducks/keyboard/actions';
import { setListItemOpen } from '../../redux/ducks/list/actions';
import { useLinearBookmarkList, useOpenMap } from './utils';

export function useKeyboardNavigation() {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { activeNodes, map } = useBookmarksState();
  const { activeDialog } = useContextState();
  const openMap = useOpenMap();
  const linearBookmarkList = useLinearBookmarkList();

  const clearActiveIndex = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleKeyboardEv = useRateLimit(
    25,
    useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          if (activeIndex !== null) {
            const bookmark = map[linearBookmarkList[activeIndex]];
            const isOpen = openMap[bookmark.id];
            if (bookmark.children) {
              dispatch(setListItemOpen({ id: bookmark.id, open: !isOpen }));
            } else {
              openInCurrentTab(bookmark.url!);
            }
          }
        } else if (e.key === 'ArrowUp') {
          if (activeIndex === 0) {
            setActiveIndex(linearBookmarkList.length - 1);
          } else {
            setActiveIndex((activeIndex ?? 1) - 1);
          }
        } else if (e.key === 'ArrowDown') {
          if (activeIndex === linearBookmarkList.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex((activeIndex ?? -1) + 1);
          }
        } else {
          clearActiveIndex();
        }
      },
      [activeIndex, clearActiveIndex, dispatch, linearBookmarkList, map, openMap]
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
    const changes = { activeNode: activeIndex === null ? null : linearBookmarkList[activeIndex] };
    dispatch(setKeyboardState({ changes }));
  }, [dispatch, activeIndex, activeNodes, map, openMap, linearBookmarkList]);

  useKeyDown(null, onKeyDown);
  useMouseMove(clearActiveIndex);
  useMouseDown(clearActiveIndex);
}
