import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKeyDown, useMouseDown, useMouseMove } from '../../helpers/BrowserHelpers';
import { useRateLimit } from '../../helpers/CallbackHelpers';
import { openInCurrentTab } from '../../helpers/ChromeApiHelpers';
import { popAction } from '../../redux/ducks/action-stack/actions';
import { useActionStackStore } from '../../redux/ducks/action-stack/selectors';
import { setBookmarkOpen } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksStore } from '../../redux/ducks/bookmarks/selectors';
import { useContextStore } from '../../redux/ducks/context/selectors';
import { AppDialogs } from '../../redux/ducks/context/store';
import { setKeyboardStore } from '../../redux/ducks/keyboard/actions';
import { useKeyboardStore } from '../../redux/ducks/keyboard/selectors';
import { inverseAction } from './action-snackbar';

export function useKeyboardNavigation() {
  const dispatch = useDispatch();
  const { linearList } = useKeyboardStore();
  const { activeDialog } = useContextStore();
  const { stack } = useActionStackStore();
  const { map, query, openMap, searchResultsOpenMap } = useBookmarksStore();
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
        } else if (e.key === 'z' && e.ctrlKey && query.length === 0) {
          const acton = stack[stack.length - 1];
          if (acton) {
            inverseAction(acton, dispatch);
            dispatch(popAction());
          }
        } else {
          clearActiveIndex();
        }
      },
      [
        activeIndex,
        clearActiveIndex,
        dispatch,
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
    const changes = { activePath: activeIndex === null ? null : linearList[activeIndex] };
    dispatch(setKeyboardStore({ changes }));
  }, [activeIndex, dispatch, linearList]);

  useKeyDown(null, onKeyDown);
  useMouseMove(clearActiveIndex);
  useMouseDown(clearActiveIndex);
}
