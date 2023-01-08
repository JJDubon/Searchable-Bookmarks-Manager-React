import { useCallback, useEffect } from 'react';
import { getChromeInstance } from '../../helpers/ChromeApiHelpers';
import { useBookmarksApi } from '../../providers/ApiProvider/hooks';

function useReset(getEvent: () => chrome.events.Event<any>) {
  const bookmarksApi = useBookmarksApi();
  const resetCallback = useCallback(() => {
    bookmarksApi.resetTree();
  }, [bookmarksApi]);

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

export function useOnMovedListener() {
  const eventCallback = useCallback(() => {
    const instance = getChromeInstance();
    return instance.bookmarks.onMoved;
  }, []);

  useReset(eventCallback);
}

export function useOnReorderedListener() {
  const eventCallback = useCallback(() => {
    const instance = getChromeInstance();
    return instance.bookmarks.onChildrenReordered;
  }, []);

  useReset(eventCallback);
}
