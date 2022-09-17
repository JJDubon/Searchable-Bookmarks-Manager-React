import styled from "styled-components";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 800px 1fr;
  grid-template-rows: 1fr 100px 500px 1fr;
  grid-template-areas: 
    ". . ."
    ". header ."
    ". main ."
    ". . .";
`;

const Header = styled.header`
  grid-area: header;
`;

const Main = styled.main`
  grid-area: main;
`;

export interface ApplicationFrameProps {
  header: JSX.Element;
  children: JSX.Element;
}

export const ApplicationFrame = ({header, children}: ApplicationFrameProps) => {
  return (
    <Frame>
      <Header>
        {header}
      </Header>
      <Main>
        {children}
      </Main>
    </Frame>
  )
}