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
import { BookmarkTreeNode } from '../../redux/ducks/bookmarks/store';

export const inverseAction = async (action: BookmarkAction, dispatch: Dispatch<AnyAction>) => {
  const bookmark = action.bookmark;
  if (action.type === 'Add') {
    await removeBookmark(bookmark.id);
  } else if (action.type === 'Delete') {
    const walk = async (node: BookmarkTreeNode, newParentId: string) => {
      const newNode = await createBookmark(node.title, node.index!, newParentId, node.url);
      dispatch(mapActionStackItem({ id: node.id, newNode }));
      await Promise.all(
        (node.children ?? []).map((childNode) => {
          return walk(childNode, newNode.id);
        })
      );
    };

    await walk(action.bookmark, action.bookmark.parentId!);
  } else if (action.type === 'Move') {
    const movedNode = await moveBookmark(
      bookmark.id,
      action.previousBookmark.parentId!,
      action.previousBookmark.index!
    );
    dispatch(mapActionStackItem({ id: bookmark.id, newNode: movedNode }));
  } else if (action.type === 'Change') {
    await editBookmark(bookmark.id, action.previousBookmark.title, action.previousBookmark.url);
  }

  dispatch(popAction());
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
