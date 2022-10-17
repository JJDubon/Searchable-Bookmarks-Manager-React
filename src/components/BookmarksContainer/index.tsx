import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { loadBookmarks } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { loadSettings } from '../../redux/ducks/settings/actions';
import { useAppIsLoading } from '../../redux/selectors';
import { BookmarksList } from './bookmark-list';
import { ContextMenu } from './ContextMenu/context-menu';
import { Dialogs } from './Dialogs';
import { BookmarkDragPreview } from './drag-preview';
import { KeyboardListener } from './KeyboardListener';
import {
  useOnChangedListener,
  useOnCreatedListener,
  useOnMovedListener,
  useOnRemovedListener,
  useOnReorderedListener,
} from './listeners';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const dispatch = useDispatch();
  const loading = useAppIsLoading();
  const { activeNodes } = useBookmarksState();

  // Initialize the application
  useEffect(() => {
    dispatch(loadSettings());
    dispatch(loadBookmarks());
  }, [dispatch]);

  // Listen for chrome api events
  useOnCreatedListener();
  useOnChangedListener();
  useOnRemovedListener();
  useOnMovedListener();
  useOnReorderedListener();

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        {!loading && (
          <>
            <KeyboardListener />
            <BookmarkDragPreview />
            <ContextMenu />
            <Dialogs />
            <BookmarksList ids={activeNodes} />
          </>
        )}
      </DndProvider>
    </Container>
  );
};
