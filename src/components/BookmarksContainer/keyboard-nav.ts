import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKeyDown, useMouseDown, useMouseMove } from '../../helpers/BrowserHelpers';
import { useRateLimit } from '../../helpers/CallbackHelpers';
import { openInCurrentTab } from '../../helpers/ChromeApiHelpers';
import { setBookmarkOpen } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { useContextState } from '../../redux/ducks/context/selectors';
import { AppDialogs } from '../../redux/ducks/context/state';
import { setKeyboardState } from '../../redux/ducks/keyboard/actions';
import { useKeyboardState } from '../../redux/ducks/keyboard/selectors';

export function useKeyboardNavigation() {
  const dispatch = useDispatch();
  const { linearList } = useKeyboardState();
  const { activeDialog } = useContextState();
  const { map, query, openMap, searchResultsOpenMap } = useBookmarksState();
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
              dispatch(setBookmarkOpen({ path, open: !isOpen }));
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
        } else {
          clearActiveIndex();
        }
      },
      [activeIndex, clearActiveIndex, dispatch, linearList, map, openMap, query, searchResultsOpenMap]
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
    const changes = { activePath: activeIndex === null ? null : linearList[activeIndex] };
    dispatch(setKeyboardState({ changes }));
  }, [activeIndex, dispatch, linearList]);

  useKeyDown(null, onKeyDown);
  useMouseMove(clearActiveIndex);
  useMouseDown(clearActiveIndex);
}
