import { useRef } from 'react';
import { Container } from './styles';

export interface ScrollableContainerProps {
  children: JSX.Element | JSX.Element[];
}

export const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return <Container ref={ref}>{children}</Container>;
};
