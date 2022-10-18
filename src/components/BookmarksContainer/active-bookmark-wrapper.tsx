import { useEffect, useRef } from 'react';
import { scrollIntoView } from '../../helpers/BrowserHelpers';
import { useKeyboardState } from '../../redux/ducks/keyboard/selectors';
import { ActiveHighlight } from './styles';

interface ActiveBookmarkWrapperProps {
  id: string;
  children: JSX.Element | JSX.Element[];
}

export const ActiveBookmarkWrapper = ({ id, children }: ActiveBookmarkWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activeNode } = useKeyboardState();

  useEffect(() => {
    if (id === activeNode && ref.current) {
      scrollIntoView(ref.current);
    }
  }, [id, activeNode]);

  return (
    <ActiveHighlight ref={ref} active={activeNode === id}>
      {children}
    </ActiveHighlight>
  );
};
