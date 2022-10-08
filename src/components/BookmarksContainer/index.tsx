import { useBookmarks } from "../../providers/BookmarksProvider";
import { BookmarksList } from './bookmark-list';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const { loading, root } = useBookmarks();

  if (loading) {
    return <></>;
  }

  return (
    <Container>
      <BookmarksList ids={root} defaultOpen={true} />
    </Container>
  )
}