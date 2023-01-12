import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import * as validUrl from 'valid-url';
import { cleanUrl } from '../../../helpers/BrowserHelpers';
import { createBookmark } from '../../../helpers/ChromeApiHelpers';
import { useActionsService, useBookmarksService } from '../../../providers/ServiceProvider/hooks';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { DialogErrorText } from './styles';

interface AddBookmarkDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddBookmarkDialog = ({ open, onClose }: AddBookmarkDialogProps) => {
  const actionsService = useActionsService();
  const bookmarksService = useBookmarksService();
  const { path, bookmark } = useContextServiceData();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>Add bookmark</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Bookmark title'
          type='text'
          fullWidth
          value={title}
          onChange={(e) => {
            setError('');
            setTitle(e.target.value);
          }}
        />
        <TextField
          margin='dense'
          id='name'
          label='Bookmark url'
          type='text'
          fullWidth
          value={url}
          onChange={(e) => {
            setError('');
            setUrl(e.target.value);
          }}
        />
        {error && <DialogErrorText>{error}</DialogErrorText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleAdd()}>Add bookmark</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setTitle('');
    setUrl('');
    setError('');
    onClose();
  }

  async function handleAdd() {
    const cleanedUrl = cleanUrl(url);
    const urlValid = validUrl.isUri(url);
    const cleanedUrlValid = validUrl.isUri(cleanedUrl);
    if (title.trim().length === 0) {
      setError('Please provide a bookmark name');
    } else if (url.trim().length === 0) {
      setError('Please provide a bookmark URL');
    } else if (!(urlValid || cleanedUrlValid)) {
      setError('Please provide a valid url');
    } else {
      let result;
      if (!urlValid) {
        result = await createBookmark(title, bookmark!.children!.length ?? 0, bookmark!.id, cleanedUrl);
      } else {
        result = await createBookmark(title, bookmark!.children!.length ?? 0, bookmark!.id, url);
      }

      actionsService.push({
        type: 'Add',
        bookmark: result,
      });

      bookmarksService.setOpen(path, true);
      handleClose();
    }
  }
};
