import { ScrollableContainer } from './ScrollableContainer';
import { Frame } from './styles';

export interface ApplicationFrameProps {
  header: JSX.Element;
  children: JSX.Element;
}

export const ApplicationFrame = ({ header, children }: ApplicationFrameProps) => {
  return (
    <Frame>
      <div>{header}</div>
      <ScrollableContainer>{children}</ScrollableContainer>
    </Frame>
  );
};
