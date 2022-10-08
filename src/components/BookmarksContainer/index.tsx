import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadBookmarks } from "../../redux/ducks/bookmarks/actions";
import { useBookmarksState } from "../../redux/ducks/bookmarks/selectors";
import { loadSettings } from "../../redux/ducks/settings/actions";
import { useAppIsLoading } from "../../redux/selectors";
import { BookmarksList } from './bookmark-list';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const loading = useAppIsLoading();
  const { activeNodes } = useBookmarksState();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSettings());
    dispatch(loadBookmarks());
  }, [dispatch]);

  if (loading) {
    return <></>;
  }

  return (
    <Container>
      <BookmarksList ids={activeNodes} defaultOpen={true} />
    </Container>
  )
}