import { useEffect, useRef } from 'react';
import { useBookmarksServiceData } from '../../services/BookmarksService/hooks';
import { scrollIntoView } from '../../helpers/BrowserHelpers';
import { ActiveHighlight } from './styles';

interface ActiveBookmarkWrapperProps {
  path: string;
  children: JSX.Element | JSX.Element[];
}

export const ActiveBookmarkWrapper = ({ path, children }: ActiveBookmarkWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activePath } = useBookmarksServiceData();

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
