import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import { Collapse, List } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setBookmarkOpen } from '../../redux/ducks/bookmarks/actions';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { ActiveBookmarkWrapper } from './active-bookmark-wrapper';
import { BookmarksList } from './bookmark-list';
import { BookmarkListItem } from './bookmark-list-item';
import { WithContextMenu } from './ContextMenu';
import { useBookmarkDrag, useBookmarkDrop } from './Drag/utils';
import { getDropBehavior, isModifiable, useListItemOverrides, useOpenStatus } from './utils';

interface FolderProps {
  id: string;
  path: string;
  indentLevel: number;
  hideDetails?: boolean;
  forceClose?: boolean;
}

export const Folder = ({ id, indentLevel, path, hideDetails = false, forceClose = false }: FolderProps) => {
  path = `${path}/${id}`;

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const folder = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, path, ref);
  const { dropType } = useBookmarkDrop(id, path, ref);
  const overrides = useListItemOverrides();

  let open = useOpenStatus(path);
  if (forceClose) {
    open = false;
  }

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
      dispatch(setBookmarkOpen({ path: path, open: !open }));
    }
  }, [dispatch, forceClose, open, path]);

  return (
    <>
      <WithContextMenu path={path} bookmark={folder}>
        <ActiveBookmarkWrapper path={path}>
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
          <BookmarksList ids={folder.children || []} path={path} indentLevel={indentLevel + 1} />
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
