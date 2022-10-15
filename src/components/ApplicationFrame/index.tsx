import { styled } from '@mui/material/styles';

const Frame = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',

  display: 'grid',
  gridTemplateRows: `86px 1fr`,
}));

const Header = styled('div')(({ theme }) => ({}));

const Main = styled('div')(({ theme }) => ({
  overflow: 'auto',
}));

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
