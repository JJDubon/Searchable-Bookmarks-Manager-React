import AddLinkIcon from '@mui/icons-material/AddLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PreviewIcon from '@mui/icons-material/Preview';
import TabIcon from '@mui/icons-material/Tab';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { copyToClipboard } from '../../../helpers/BrowserHelpers';
import {
  openInCurrentTab,
  openInNewIncognitoWindow,
  openInNewTab,
  openInNewWindow,
} from '../../../helpers/ChromeApiHelpers';
import { FlattenedBookmarkTreeNode } from '../../../redux/ducks/bookmarks/state';
import { setActiveDialog } from '../../../redux/ducks/context/actions';
import { AppDialogs } from '../../../redux/ducks/context/state';
import { setListItemOpen } from '../../../redux/ducks/list/actions';
import { setSettings } from '../../../redux/ducks/settings/actions';
import { useSettings } from '../../../redux/ducks/settings/selectors';
import { isModifiable } from '../utils';

interface MenuProps {
  bookmark: FlattenedBookmarkTreeNode | null;
}

export const Menu = ({ bookmark }: MenuProps) => {
  const dispatch = useDispatch();
  const { defaultOpenMap } = useSettings();
  const type = bookmark?.children ? 'folder' : 'bookmark';
  const modifiable = bookmark && isModifiable(bookmark);
  const menuItems = useMemo(() => {
    const bookmarkOptions = [
      <MenuItem key='open-current' onClick={() => openInCurrentTab(bookmark!.url!)}>
        <ListItemIcon>
          <ExitToAppIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in current tab</ListItemText>
      </MenuItem>,
      <MenuItem key='open-new-tab' onClick={() => openInNewTab(bookmark!.url!)}>
        <ListItemIcon>
          <TabIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new tab</ListItemText>
      </MenuItem>,
      <MenuItem key='open-new-window' onClick={() => openInNewWindow(bookmark!.url!)}>
        <ListItemIcon>
          <OpenInNewIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new window</ListItemText>
      </MenuItem>,
      <MenuItem key='open-new-i-window' onClick={() => openInNewIncognitoWindow(bookmark!.url!)}>
        <ListItemIcon>
          <PreviewIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new incognito window</ListItemText>
      </MenuItem>,
      <Divider key='d1' />,
      <MenuItem key='copy-title' onClick={() => copyToClipboard(bookmark?.title ?? '')}>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy title</ListItemText>
      </MenuItem>,
      <MenuItem key='copy-link' onClick={() => copyToClipboard(bookmark?.url ?? '')}>
        <ListItemIcon>
          <AddLinkIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy link</ListItemText>
      </MenuItem>,
    ];

    const openByDefault = !bookmark ? false : defaultOpenMap[bookmark.id];
    const folderOptions = [
      <MenuItem key='copy-title' onClick={() => copyToClipboard(bookmark?.title ?? '')}>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy title</ListItemText>
      </MenuItem>,
      <MenuItem
        key='toggle-open-default'
        onClick={() => {
          const updatedOption = !openByDefault;
          const updatedMap = { ...defaultOpenMap, [bookmark!.id]: updatedOption };
          dispatch(setSettings({ defaultOpenMap: updatedMap }));
          dispatch(setListItemOpen(bookmark!.id, updatedOption));
        }}
      >
        <ListItemIcon>
          <FolderOpenIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Toggle {openByDefault ? 'closed' : 'open'} by default</ListItemText>
      </MenuItem>,
      <Divider key='d2' />,
      <MenuItem key='add-bookmark' onClick={() => dispatch(setActiveDialog(AppDialogs.AddBookmark))}>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add Bookmark</ListItemText>
      </MenuItem>,
      <MenuItem key='add-folder' onClick={() => dispatch(setActiveDialog(AppDialogs.AddFolder))}>
        <ListItemIcon>
          <CreateNewFolderIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add Folder</ListItemText>
      </MenuItem>,
    ];

    const modifiableOptions = [
      <Divider key='d3' />,
      <MenuItem
        key='edit'
        onClick={() => {
          if (type === 'folder') {
            dispatch(setActiveDialog(AppDialogs.EditFolder));
          } else {
            dispatch(setActiveDialog(AppDialogs.EditBookmark));
          }
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Edit {type}</ListItemText>
      </MenuItem>,
      <MenuItem key='delete' onClick={() => dispatch(setActiveDialog(AppDialogs.DeleteBookmark))}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Delete {type}</ListItemText>
      </MenuItem>,
    ];

    return [
      ...(type === 'bookmark' ? bookmarkOptions : []),
      ...(type === 'folder' ? folderOptions : []),
      ...(modifiable ? modifiableOptions : []),
    ];
  }, [type, modifiable, bookmark, defaultOpenMap, dispatch]);

  return <MenuList dense>{menuItems}</MenuList>;
};
