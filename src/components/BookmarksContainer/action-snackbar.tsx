import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar } from '@mui/material';
import { truncate } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createBookmark, editBookmark, moveBookmark, removeBookmark } from '../../helpers/ChromeApiHelpers';
import { clearStackAction } from '../../redux/ducks/action-stack/actions';
import { useActionStack } from '../../redux/ducks/action-stack/selectors';
import { BookmarkAction } from '../../redux/ducks/action-stack/state';

export const inverseAction = (action: BookmarkAction) => {
  const bookmark = action.bookmark;
  switch (action.type) {
    case 'Add':
      removeBookmark(bookmark.id);
      break;
    case 'Delete':
      createBookmark(bookmark.title, bookmark.index!, bookmark.parentId!, bookmark.url);
      // TODO - Map old to new somewhere. that will be important for ctrl-Z
      //        Need to figure out how that will work too
      break;
    case 'Move':
      moveBookmark(bookmark.id, action.previousBookmark.parentId!, action.previousBookmark.index!);
      break;
    case 'Change':
      editBookmark(bookmark.id, action.previousBookmark.title, action.previousBookmark.url);
      break;
  }
};

export const ActionSnackbar = () => {
  const dispatch = useDispatch();
  const { currentAction } = useActionStack();

  const handleClose = useCallback(() => {
    dispatch(clearStackAction());
  }, [dispatch]);

  const actionText = useMemo(() => {
    const options = { length: 16 };
    const bookmarkType =
      currentAction?.bookmark.children && currentAction?.bookmark.children.length !== 0
        ? 'Folder'
        : 'Bookmark';
    switch (currentAction?.type) {
      case 'Add':
        return `${bookmarkType} "${truncate(currentAction.bookmark.title, options)}" added`;
      case 'Delete':
        return `${bookmarkType} "${truncate(currentAction.bookmark.title, options)}" deleted`;
      case 'Move':
        return `${bookmarkType} "${truncate(currentAction.bookmark.title, options)}" moved`;
      case 'Change':
        return `${bookmarkType} "${truncate(currentAction.bookmark.title, options)}" updated`;
    }
  }, [currentAction]);

  const handleUndo = useCallback(() => {
    if (currentAction) {
      inverseAction(currentAction);
      dispatch(clearStackAction());
    }
  }, [dispatch, currentAction]);

  const action = useMemo(
    () => (
      <React.Fragment>
        <Button color='secondary' size='small' onClick={handleUndo}>
          UNDO
        </Button>
        <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </React.Fragment>
    ),
    [handleClose, handleUndo]
  );

  return (
    <Snackbar
      open={!!currentAction}
      autoHideDuration={4000}
      onClose={() => dispatch(clearStackAction())}
      message={actionText}
      action={action}
    />
  );
};