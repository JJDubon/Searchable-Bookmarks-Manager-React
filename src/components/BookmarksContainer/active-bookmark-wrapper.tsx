import { useEffect, useRef } from 'react';
import { useBookmarksApiData } from '../../apis/BookmarksApi/hooks';
import { scrollIntoView } from '../../helpers/BrowserHelpers';
import { ActiveHighlight } from './styles';

interface ActiveBookmarkWrapperProps {
  path: string;
  children: JSX.Element | JSX.Element[];
}

export const ActiveBookmarkWrapper = ({ path, children }: ActiveBookmarkWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activePath } = useBookmarksApiData();

  useEffect(() => {
    if (path === activePath && ref.current) {
      scrollIntoView(ref.current);
    }
  }, [path, activePath]);

  return (
    <ActiveHighlight ref={ref} active={activePath === path}>
      {children}
    </ActiveHighlight>
  );
};
