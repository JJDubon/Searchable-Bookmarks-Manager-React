import { useEffect, useRef } from 'react';
import { scrollIntoView } from '../../helpers/BrowserHelpers';
import { useKeyboardState } from '../../redux/ducks/keyboard/selectors';
import { ActiveHighlight } from './styles';

interface ActiveBookmarkWrapperProps {
  path: string;
  children: JSX.Element | JSX.Element[];
}

export const ActiveBookmarkWrapper = ({ path, children }: ActiveBookmarkWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activeNode } = useKeyboardState();

  useEffect(() => {
    if (path === activeNode && ref.current) {
      scrollIntoView(ref.current);
    }
  }, [path, activeNode]);

  return (
    <ActiveHighlight ref={ref} active={activeNode === path}>
      {children}
    </ActiveHighlight>
  );
};
