import { useCallback, useEffect } from 'react';
import { getChromeInstance } from '../../helpers/ChromeApiHelpers';
import { useBookmarksService } from '../../providers/ServiceProvider/hooks';

function useReset(getEvent: () => chrome.events.Event<any>) {
  const bookmarksService = useBookmarksService();
  const resetCallback = useCallback(() => {
    bookmarksService.resetTree();
  }, [bookmarksService]);

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
