import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import { Collapse, List } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { getMuiColor } from '../../helpers/ColorHelpers';
import { useBookmarksService } from '../../providers/ServiceProvider/hooks';
import { useBookmark } from '../../services/BookmarksService/hooks';
import { useSettings } from '../../services/SettingsService/hooks';
import { FolderColor } from '../../services/SettingsService/types';
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

  const ref = useRef<HTMLDivElement>(null);
  const bookmarksService = useBookmarksService();
  const folder = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id, path, ref);
  const { dropType } = useBookmarkDrop(id, path, ref);
  const overrides = useListItemOverrides();
  const { colorMap, palette } = useSettings();

  let open = useOpenStatus(path);
  if (forceClose) {
    open = false;
  }

  const folderIcon = useMemo(() => {
    const dropBehavior = getDropBehavior('folder', isModifiable(folder), open, dropType);
    const color = getMuiColor(colorMap[id] ?? FolderColor.Grey)[palette === 'dark' ? 300 : 600];
    if (dropBehavior === 'inside') {
      return <CreateNewFolderIcon sx={{ color }} />;
    } else {
      return <FolderIcon sx={{ color }} />;
    }
  }, [folder, open, dropType, colorMap, palette, id]);

  const onClick = useCallback(() => {
    if (!forceClose) {
      bookmarksService.setOpen(path, !open);
    }
  }, [bookmarksService, forceClose, open, path]);

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
