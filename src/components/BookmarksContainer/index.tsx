import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { loadBookmarks } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { loadSettings } from '../../redux/ducks/settings/actions';
import { useAppIsLoading } from '../../redux/selectors';
import { BookmarksList } from './bookmark-list';
import { BookmarkDragPreview } from './drag-preview';
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
      <DndProvider backend={HTML5Backend}>
        <BookmarkDragPreview />
        <BookmarksList ids={activeNodes} defaultOpen={true} />
      </DndProvider>
    </Container>
  );
};
