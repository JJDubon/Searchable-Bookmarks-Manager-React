import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKeyDown, useMouseDown, useMouseMove } from '../../helpers/BrowserHelpers';
import { useRateLimit } from '../../helpers/CallbackHelpers';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { setKeyboardState, setLinearList } from '../../redux/ducks/keyboard/actions';
import { useKeyboardState } from '../../redux/ducks/keyboard/selectors';
import { useListState } from '../../redux/ducks/list/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';

export function useKeyboardNavigation() {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { activeNodes, map } = useBookmarksState();
  const { defaultOpenMap } = useSettings();
  const { openMap } = useListState();
  const { linearNodes } = useKeyboardState();

  useEffect(() => {
    dispatch(setLinearList(activeNodes, map, { ...defaultOpenMap, ...openMap }));
  }, [dispatch, activeNodes, map, defaultOpenMap, openMap]);

  const clearActiveIndex = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleKeyboardEv = useRateLimit(
    10,
    useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
        } else if (e.key === 'ArrowUp') {
          if (activeIndex === 0) {
            setActiveIndex(linearNodes.length - 1);
          } else {
            setActiveIndex((activeIndex ?? 1) - 1);
          }
        } else if (e.key === 'ArrowDown') {
          if (activeIndex === linearNodes.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex((activeIndex ?? -1) + 1);
          }
        } else {
          clearActiveIndex();
        }
      },
      [activeIndex, clearActiveIndex, linearNodes.length]
    )
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      handleKeyboardEv(e);
    },
    [handleKeyboardEv]
  );

  useEffect(() => {
    dispatch(setKeyboardState({ activeNode: activeIndex === null ? null : linearNodes[activeIndex] }));
  }, [dispatch, activeIndex, linearNodes]);

  useKeyDown(null, onKeyDown);
  useMouseMove(clearActiveIndex);
  useMouseDown(clearActiveIndex);
}
