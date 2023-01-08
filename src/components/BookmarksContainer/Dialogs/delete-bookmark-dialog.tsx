import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { BookmarkTreeNode } from '../../../apis/BookmarksApi/types';
import { getBookmark, getFolder, removeBookmark, removeFolder } from '../../../helpers/ChromeApiHelpers';
import { pushAction } from '../../../redux/ducks/action-stack/actions';
import { useContextStore } from '../../../redux/ducks/context/selectors';
import { BookmarkTitle, DialogContentTitleText } from './styles';

interface DeleteBookmarkDialogProps {
  open: boolean;
  onClose: () => void;
}

export const DeleteBookmarkDialog = ({ open, onClose }: DeleteBookmarkDialogProps) => {
  const dispatch = useDispatch();
  const { bookmark } = useContextStore();
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
        <Button onClick={() => handleRemove()}>Delete {type}</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    onClose();
  }

  async function handleRemove() {
    let bookmarkNode: BookmarkTreeNode;
    if (bookmark!.children) {
      bookmarkNode = await getFolder(bookmark!.id);
      await removeFolder(bookmark!.id);
    } else {
      bookmarkNode = await getBookmark(bookmark!.id);
      await removeBookmark(bookmark!.id);
    }

    if (bookmark) {
      dispatch(
        pushAction({
          action: {
            type: 'Delete',
            bookmark: bookmarkNode,
          },
          showSnackbar: true,
        })
      );
    }

    handleClose();
  }
};
