import styled from "styled-components";
import { useBookmarks } from "../../providers/BookmarksProvider";

const Title = styled.h1`
  
`;

export const Header = () => {
  const { loading, map } = useBookmarks();
  return (
    <Title>
      Select a bookmark:
    </Title>
  )
}