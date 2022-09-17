import styled from "styled-components";
import { useBookmarks } from "../../providers/BookmarksProvider";

const Title = styled.h1`
  
`;

export const Header = () => {
  const { loading, tree } = useBookmarks();
  console.log({loading, tree});
  return (
    <Title>
      Select a bookmark:
    </Title>
  )
}