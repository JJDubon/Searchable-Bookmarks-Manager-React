import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useBookmarksState } from '../../../redux/ducks/bookmarks/selectors';
import { setLinearList } from '../../../redux/ducks/keyboard/actions';
import { useListState } from '../../../redux/ducks/list/selectors';

export const KeyboardListener = () => {
  const dispatch = useDispatch();
  const { activeNodes, map } = useBookmarksState();
  const { openMap } = useListState();

  useEffect(() => {
    dispatch(setLinearList(activeNodes, map, openMap));
  }, [dispatch, activeNodes, map, openMap]);

  return <></>;
};
