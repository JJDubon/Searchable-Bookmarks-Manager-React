import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar } from '@mui/material';
import { truncate } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { createBookmark, editBookmark, moveBookmark, removeBookmark } from '../../helpers/ChromeApiHelpers';
import { useActionsService } from '../../providers/ServiceProvider/hooks';
import { ActionsService } from '../../services/ActionsService';
import { useActionsServiceData } from '../../services/ActionsService/hooks';
import { BookmarkAction } from '../../services/ActionsService/types';
import { BookmarkTreeNode } from '../../services/BookmarksService/types';

export const inverseAction = async (action: BookmarkAction, actionsService: ActionsService) => {
  const bookmark = action.bookmark;
  if (action.type === 'Add') {
    await removeBookmark(bookmark.id);
  } else if (action.type === 'Delete') {
    const walk = async (node: BookmarkTreeNode, newParentId: string) => {
      const newNode = await createBookmark(node.title, node.index!, newParentId, node.url);
      actionsService.mapItem(node.id, newNode);
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
    actionsService.mapItem(bookmark.id, movedNode);
  } else if (action.type === 'Change') {
    await editBookmark(bookmark.id, action.previousBookmark.title, action.previousBookmark.url);
  }

  actionsService.pop();
};

export const ActionSnackbar = () => {
  const actionsService = useActionsService();
  const { currentAction, stack } = useActionsServiceData();

  const handleClose = useCallback(() => {
    actionsService.clearCurrentAction();
  }, [actionsService]);

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
      inverseAction(action, actionsService).then(() => {
        actionsService.clearCurrentAction();
      });
    }
  }, [actionsService, stack]);

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
      onClose={() => actionsService.clearCurrentAction()}
      message={actionText}
      action={action}
    />
  );
};
