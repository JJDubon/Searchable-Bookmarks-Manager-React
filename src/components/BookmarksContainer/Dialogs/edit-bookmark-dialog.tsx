import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import * as validUrl from 'valid-url';
import { cleanUrl } from '../../../helpers/BrowserHelpers';
import { editBookmark, getBookmark } from '../../../helpers/ChromeApiHelpers';
import { useActionsService } from '../../../providers/ServiceProvider/hooks';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { DialogErrorText } from './styles';

interface EditBookmarkDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EditBookmarkDialog = ({ open, onClose }: EditBookmarkDialogProps) => {
  const actionsService = useActionsService();
  const { bookmark } = useContextServiceData();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (bookmark) {
      setError('');
      setTitle(bookmark?.title ?? '');
      setUrl(bookmark?.url ?? '');
    }
  }, [bookmark]);

  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>Edit bookmark</DialogTitle>
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
        <Button onClick={() => handleEdit()}>Save bookmark</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setTitle('');
    setUrl('');
    setError('');
    onClose();
  }

  async function handleEdit() {
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
      const bookmarkUrl = urlValid ? url : cleanedUrl;
      const oldBookmarkNode = await getBookmark(bookmark!.id);
      const result = await editBookmark(bookmark!.id, title, bookmarkUrl);
      actionsService.push({
        type: 'Change',
        bookmark: oldBookmarkNode,
        previousBookmark: result,
      });

      handleClose();
    }
  }
};
