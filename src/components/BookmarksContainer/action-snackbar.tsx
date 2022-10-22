import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar } from '@mui/material';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { truncate } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createBookmark, editBookmark, moveBookmark, removeBookmark } from '../../helpers/ChromeApiHelpers';
import { clearCurrentAction, mapActionStackItem, popAction } from '../../redux/ducks/action-stack/actions';
import { useActionStackStore } from '../../redux/ducks/action-stack/selectors';
import { BookmarkAction } from '../../redux/ducks/action-stack/store';

export const inverseAction = (action: BookmarkAction, dispatch: Dispatch<AnyAction>) => {
  const bookmark = action.bookmark;
  switch (action.type) {
    case 'Add':
      removeBookmark(bookmark.id);
      break;
    case 'Delete':
      createBookmark(bookmark.title, bookmark.index!, bookmark.parentId!, bookmark.url).then((newNode) => {
        dispatch(mapActionStackItem({ id: newNode.id, oldId: bookmark.id }));
      });
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
  const { currentAction, stack } = useActionStackStore();

  const handleClose = useCallback(() => {
    dispatch(clearCurrentAction());
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
    const action = stack[stack.length - 1];
    if (action) {
      inverseAction(action, dispatch);
      dispatch(popAction());
    }
  }, [dispatch, stack]);

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
      onClose={() => dispatch(clearCurrentAction())}
      message={actionText}
      action={action}
    />
  );
};
