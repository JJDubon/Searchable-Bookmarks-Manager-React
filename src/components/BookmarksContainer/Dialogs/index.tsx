import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/ducks/context/actions';
import { useContextStore } from '../../../redux/ducks/context/selectors';
import { AppDialogs } from '../../../redux/ducks/context/store';
import { AddBookmarkDialog } from './add-bookmark-dialog';
import { AddFolderDialog } from './add-folder-dialog';
import { DeleteBookmarkDialog } from './delete-bookmark-dialog';
import { EditBookmarkDialog } from './edit-bookmark-dialog';
import { EditFolderDialog } from './edit-folder-dialog';

export const Dialogs = () => {
  const dispatch = useDispatch();
  const { activeDialog } = useContextStore();
  return ReactDOM.createPortal(
    <>
      <AddBookmarkDialog open={activeDialog === AppDialogs.AddBookmark} onClose={() => close()} />
      <EditBookmarkDialog open={activeDialog === AppDialogs.EditBookmark} onClose={() => close()} />
      <AddFolderDialog open={activeDialog === AppDialogs.AddFolder} onClose={() => close()} />
      <EditFolderDialog open={activeDialog === AppDialogs.EditFolder} onClose={() => close()} />
      <DeleteBookmarkDialog open={activeDialog === AppDialogs.DeleteBookmark} onClose={() => close()} />
    </>,
    document.body
  );

  function close() {
    dispatch(setActiveDialog({ dialog: AppDialogs.None }));
  }
};
