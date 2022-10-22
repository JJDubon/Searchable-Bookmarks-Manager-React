import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookmark } from '../../../helpers/ChromeApiHelpers';
import { pushAction } from '../../../redux/ducks/action-stack/actions';
import { setBookmarkOpen } from '../../../redux/ducks/bookmarks/actions';
import { useContextStore } from '../../../redux/ducks/context/selectors';
import { DialogErrorText } from './styles';

interface AddFolderDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddFolderDialog = ({ open, onClose }: AddFolderDialogProps) => {
  const dispatch = useDispatch();
  const { path, bookmark } = useContextStore();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>Add folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Folder title'
          type='text'
          fullWidth
          value={title}
          onChange={(e) => {
            setError('');
            setTitle(e.target.value);
          }}
        />
        {error && <DialogErrorText>{error}</DialogErrorText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleAdd()}>Add folder</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setTitle('');
    setError('');
    onClose();
  }

  function handleAdd() {
    if (title.trim().length === 0) {
      setError('Please provide a bookmark name');
    } else {
      createBookmark(title, bookmark!.children!.length ?? 0, bookmark!.id).then((result) => {
        dispatch(
          pushAction({
            action: {
              type: 'Add',
              bookmark: {
                ...result,
                children: result.children ? result.children.map((n) => n.id) : undefined,
              },
            },
            showSnackbar: true,
          })
        );
      });

      dispatch(setBookmarkOpen({ path, open: true }));
      handleClose();
    }
  }
};
