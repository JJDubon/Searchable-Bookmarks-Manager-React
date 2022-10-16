import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { editBookmark } from '../../../helpers/ChromeApiHelpers';
import { useContextState } from '../../../redux/ducks/context/selectors';
import { DialogErrorText } from './styles';

interface EditFolderDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EditFolderDialog = ({ open, onClose }: EditFolderDialogProps) => {
  const { bookmark } = useContextState();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (bookmark) {
      setError('');
      setTitle(bookmark?.title ?? '');
    }
  }, [bookmark]);

  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>Edit Folder</DialogTitle>
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
        <Button onClick={() => handleEdit()}>Edit</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setTitle('');
    setError('');
    onClose();
  }

  function handleEdit() {
    if (title.trim().length === 0) {
      setError('Please provide a bookmark name');
    } else {
      editBookmark(bookmark!.id, title);
      handleClose();
    }
  }
};
