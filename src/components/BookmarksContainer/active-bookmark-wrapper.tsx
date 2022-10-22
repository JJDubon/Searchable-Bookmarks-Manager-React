import { useEffect, useRef } from 'react';
import { scrollIntoView } from '../../helpers/BrowserHelpers';
import { useKeyboardStore } from '../../redux/ducks/keyboard/selectors';
import { ActiveHighlight } from './styles';

interface ActiveBookmarkWrapperProps {
  path: string;
  children: JSX.Element | JSX.Element[];
}

export const ActiveBookmarkWrapper = ({ path, children }: ActiveBookmarkWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activePath } = useKeyboardStore();

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
