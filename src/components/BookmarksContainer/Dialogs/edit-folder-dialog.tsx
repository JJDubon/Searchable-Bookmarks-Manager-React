import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { editBookmark, getBookmark } from '../../../helpers/ChromeApiHelpers';
import { useActionsService } from '../../../providers/ServiceProvider/hooks';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { DialogErrorText } from './styles';

interface EditFolderDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EditFolderDialog = ({ open, onClose }: EditFolderDialogProps) => {
  const actionsService = useActionsService();
  const { bookmark } = useContextServiceData();
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

  async function handleEdit() {
    if (title.trim().length === 0) {
      setError('Please provide a bookmark name');
    } else {
      const oldBookmarkNode = await getBookmark(bookmark!.id);
      const result = await editBookmark(bookmark!.id, title);
      actionsService.push({
        type: 'Change',
        bookmark: cloneDeep(result),
        previousBookmark: cloneDeep(oldBookmarkNode),
      });
      handleClose();
    }
  }
};
