import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getChromeInstance } from '../../helpers/ChromeApiHelpers';
import { resetBookmarks } from '../../redux/ducks/bookmarks/actions';

function useReset(getEvent: () => chrome.events.Event<any>) {
  const dispatch = useDispatch();
  const resetCallback = useCallback(() => {
    dispatch(resetBookmarks());
  }, [dispatch]);

  return useEffect(() => {
    getEvent().addListener(resetCallback);
    return () => {
      getEvent().removeListener(resetCallback);
    };
  }, [getEvent, resetCallback]);
}

export function useOnCreatedListener() {
  const eventCallback = useCallback(() => {
    const instance = getChromeInstance();
    return instance.bookmarks.onCreated;
  }, []);

  useReset(eventCallback);
}

export function useOnChangedListener() {
  const eventCallback = useCallback(() => {
    const instance = getChromeInstance();
    return instance.bookmarks.onChanged;
  }, []);

  useReset(eventCallback);
}

export function useOnRemovedListener() {
  const eventCallback = useCallback(() => {
    const instance = getChromeInstance();
    return instance.bookmarks.onRemoved;
  }, []);

  useReset(eventCallback);
}
