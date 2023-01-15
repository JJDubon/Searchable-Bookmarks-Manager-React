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

export function cleanUrl(url: string): string {
  const hasValidHttpOrHttpsHeader = url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
  if (!hasValidHttpOrHttpsHeader) {
    url = `https://${url}`;
  }

  return url;
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}

export function scrollIntoView(element: HTMLElement): void {
  let targetTop = element.getBoundingClientRect().top;
  let targetBottom = element.getBoundingClientRect().bottom;

  // Scroll down to the target.
  if (targetTop >= 0 && targetBottom >= window.innerHeight) {
    element.scrollIntoView(false);
  }

  // Scroll up to the target.
  else if (targetTop - 80 < 0) {
    element.scrollIntoView(true);
  }
}
