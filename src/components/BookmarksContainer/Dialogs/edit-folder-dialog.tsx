import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBookmark } from '../../../helpers/ChromeApiHelpers';
import { addAction } from '../../../redux/ducks/action-stack/actions';
import { useContextState } from '../../../redux/ducks/context/selectors';
import { DialogErrorText } from './styles';

interface EditFolderDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EditFolderDialog = ({ open, onClose }: EditFolderDialogProps) => {
  const dispatch = useDispatch();
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
      <DialogTitle>Edit folder</DialogTitle>
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
        <Button onClick={() => handleEdit()}>Save folder</Button>
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
      editBookmark(bookmark!.id, title).then((result) => {
        if (bookmark) {
          dispatch(
            addAction({
              action: {
                type: 'Change',
                bookmark: {
                  ...result,
                  children: result.children?.map((n) => n.id),
                },
                previousBookmark: bookmark,
              },
              showSnackbar: true,
            })
          );
        }
      });

      handleClose();
    }
  }
};
