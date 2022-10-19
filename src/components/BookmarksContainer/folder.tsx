import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import { Collapse, List } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { setListItemOpen } from '../../redux/ducks/list/actions';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { ActiveBookmarkWrapper } from './active-bookmark-wrapper';
import { BookmarksList } from './bookmark-list';
import { BookmarkListItem } from './bookmark-list-item';
import { WithContextMenu } from './ContextMenu';
import { useBookmarkDrag, useBookmarkDrop } from './Drag/utils';
import { BookmarkPrimaryTextOverrides } from './styles';
import { getDropBehavior, isModifiable, useOpenStatus } from './utils';

interface FolderProps {
  id: string;
  indentLevel: number;
  hideDetails?: boolean;
  forceClose?: boolean;
}

export const Folder = ({ id, indentLevel, hideDetails = false, forceClose = false }: FolderProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const folder = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, ref);
  const { dropType } = useBookmarkDrop(id, ref);
  const { fontSize, noWrap } = useSettings();
  let open = useOpenStatus(id);
  if (forceClose) {
    open = false;
  }

  const overrides = useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);

  const folderIcon = useMemo(() => {
    const dropBehavior = getDropBehavior('folder', isModifiable(folder), open, dropType);
    if (dropBehavior === 'inside') {
      return <CreateNewFolderIcon />;
    } else {
      return <FolderIcon />;
    }
  }, [dropType, folder, open]);

  const onClick = useCallback(() => {
    if (!forceClose) {
      dispatch(setListItemOpen(folder.id, !open));
    }
  }, [dispatch, folder.id, forceClose, open]);

  return (
    <>
      <WithContextMenu bookmark={folder}>
        <ActiveBookmarkWrapper id={id}>
          <div ref={ref}>
            <BookmarkListItem
              title={folder.title}
              type={'folder'}
              indentLevel={indentLevel}
              isDragging={isDragging}
              dropType={dropType}
              isModifiable={isModifiable(folder)}
              overrides={overrides}
              isOpen={open}
              icon={folderIcon}
              onClick={onClick}
              hideDetails={hideDetails}
            />
          </div>
        </ActiveBookmarkWrapper>
      </WithContextMenu>
      <Collapse in={open} timeout={150} unmountOnExit>
        {folder.children && folder.children.length !== 0 && (
          <BookmarksList ids={folder.children || []} indentLevel={indentLevel + 1} />
        )}
        {(!folder.children || folder.children.length === 0) && (
          <List disablePadding>
            <BookmarkListItem
              title='Empty Folder'
              type='bookmark'
              icon={<TabUnselectedIcon />}
              indentLevel={indentLevel + 1}
              isDragging={false}
              dropType={null}
              isModifiable={false}
              overrides={overrides}
              onClick={() => {}}
              disabled
              hideDetails
            />
          </List>
        )}
      </Collapse>
    </>
  );
};
