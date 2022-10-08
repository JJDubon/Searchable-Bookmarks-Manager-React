import { useBookmarksState } from "../../redux/ducks/bookmarks/selectors";
import { BookmarksList } from './bookmark-list';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const { loading, root } = useBookmarksState();

  if (loading) {
    return <></>;
  }

  return (
    <Container>
      <BookmarksList ids={root} defaultOpen={true} />
    </Container>
  )
}