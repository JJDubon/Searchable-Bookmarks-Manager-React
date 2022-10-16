import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getChromeInstance } from '../../helpers/ChromeApiHelpers';
import { resetBookmarks } from '../../redux/ducks/bookmarks/actions';

export function useOnCreatedListener() {
  const dispatch = useDispatch();
  const resetCallback = useCallback(() => {
    dispatch(resetBookmarks());
  }, [dispatch]);

  return useEffect(() => {
    const instance = getChromeInstance();
    instance.bookmarks.onCreated.addListener(resetCallback);
    return () => {
      instance.bookmarks.onCreated.removeListener(resetCallback);
    };
  });
}

export function useOnChangedListener() {
  const dispatch = useDispatch();
  const resetCallback = useCallback(() => {
    dispatch(resetBookmarks());
  }, [dispatch]);

  return useEffect(() => {
    const instance = getChromeInstance();
    instance.bookmarks.onChanged.addListener(resetCallback);
    return () => {
      instance.bookmarks.onChanged.removeListener(resetCallback);
    };
  });
}
