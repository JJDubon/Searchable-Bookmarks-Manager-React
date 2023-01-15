import ReactDOM from 'react-dom';
import { useContextService } from '../../../providers/ServiceProvider/hooks';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { AppDialogs } from '../../../services/ContextService/types';
import { AddBookmarkDialog } from './add-bookmark-dialog';
import { AddFolderDialog } from './add-folder-dialog';
import { ChangeColorDialog } from './change-color-dialog';
import { DeleteBookmarkDialog } from './delete-bookmark-dialog';
import { EditBookmarkDialog } from './edit-bookmark-dialog';
import { EditFolderDialog } from './edit-folder-dialog';

export const Dialogs = () => {
  const contextService = useContextService();
  const { activeDialog } = useContextServiceData();
  return ReactDOM.createPortal(
    <>
      <AddBookmarkDialog open={activeDialog === AppDialogs.AddBookmark} onClose={() => close()} />
      <EditBookmarkDialog open={activeDialog === AppDialogs.EditBookmark} onClose={() => close()} />
      <AddFolderDialog open={activeDialog === AppDialogs.AddFolder} onClose={() => close()} />
      <EditFolderDialog open={activeDialog === AppDialogs.EditFolder} onClose={() => close()} />
      <DeleteBookmarkDialog open={activeDialog === AppDialogs.DeleteBookmark} onClose={() => close()} />
      <ChangeColorDialog open={activeDialog === AppDialogs.ColorSelector} onClose={() => close()} />
    </>,
    document.body
  );

  function close() {
    contextService.setActiveDialog(AppDialogs.None);
  }
};
