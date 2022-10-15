import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

export const useElementSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState({ height: 0, width: 0 });

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    setSize({
      height: entry.contentRect.height,
      width: entry.contentRect.width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer: ResizeObserver | null = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      handleResize(entries)
    );

    observer.observe(ref.current);
    return () => {
      observer?.disconnect();
    };
  }, [handleResize, ref]);

  return size;
};
