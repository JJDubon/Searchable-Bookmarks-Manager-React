import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { removeBookmark, removeFolder } from '../../../helpers/ChromeApiHelpers';
import { useContextState } from '../../../redux/ducks/context/selectors';
import { BookmarkTitle, DialogContentTitleText } from './styles';

interface DeleteBookmarkDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DeleteBookmarkDialog = ({ open, onClose }: DeleteBookmarkDialogProps) => {
  const { bookmark } = useContextState();
  if (!bookmark) {
    return <></>;
  }

  const type = bookmark.children ? 'folder' : 'bookmark';

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>Delete {type}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the following bookmark? This action cannot be undone.
        </DialogContentText>
        <DialogContentTitleText>
          Title: "<BookmarkTitle>{bookmark!.title}</BookmarkTitle>"
        </DialogContentTitleText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleRemove()}>Delete</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    onClose();
  }

  function handleRemove() {
    if (bookmark!.children) {
      removeFolder(bookmark!.id);
    } else {
      removeBookmark(bookmark!.id);
    }

    handleClose();
  }
};
