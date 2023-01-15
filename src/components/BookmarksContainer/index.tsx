import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBookmarksServiceData } from '../../services/BookmarksService/hooks';
import { ActionSnackbar } from './action-snackbar';
import { BookmarksList } from './bookmark-list';
import { ContextMenu } from './ContextMenu/context-menu';
import { Dialogs } from './Dialogs';
import { BookmarkDragPreview } from './Drag';
import { Container } from './styles';

export const BookmarksContainer = () => {
  const { activeNodes } = useBookmarksServiceData();
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
