import { Frame, Header, Main } from './styles';

export interface ApplicationFrameProps {
  header: JSX.Element;
  children: JSX.Element;
}

export const ApplicationFrame = ({ header, children }: ApplicationFrameProps) => {
  return (
    <Frame>
      <Header>{header}</Header>
      <Main>{children}</Main>
    </Frame>
  );
};
