import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBookmarksStore } from '../../redux/ducks/bookmarks/selectors';
import { ActionSnackbar } from './action-snackbar';
import { BookmarksList } from './bookmark-list';
import { ContextMenu } from './ContextMenu/context-menu';
import { Dialogs } from './Dialogs';
import { BookmarkDragPreview } from './Drag';
import { useKeyboardNavigation } from './keyboard-nav';
import {
  useOnChangedListener,
  useOnCreatedListener,
  useOnMovedListener,
  useOnRemovedListener,
  useOnReorderedListener,
} from './listeners';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const { activeNodes } = useBookmarksStore();

  // Listen for chrome api events
  useOnCreatedListener();
  useOnChangedListener();
  useOnRemovedListener();
  useOnMovedListener();
  useOnReorderedListener();

  // Listen to keyboard navigation events
  useKeyboardNavigation();

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <ActionSnackbar />
        <BookmarkDragPreview />
        <ContextMenu />
        <Dialogs />
        <BookmarksList ids={activeNodes} path='/root' />
      </DndProvider>
    </Container>
  );
};
