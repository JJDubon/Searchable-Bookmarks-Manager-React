import AddLinkIcon from '@mui/icons-material/AddLink';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FormatColorFill from '@mui/icons-material/FormatColorFill';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PreviewIcon from '@mui/icons-material/Preview';
import TabIcon from '@mui/icons-material/Tab';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useMemo } from 'react';
import { copyToClipboard } from '../../../helpers/BrowserHelpers';
import {
  openInCurrentTab,
  openInNewIncognitoWindow,
  openInNewTab,
  openInNewWindow,
  openTabsInNewGroup,
} from '../../../helpers/ChromeApiHelpers';
import {
  useBookmarksService,
  useContextService,
  useSettingsService,
} from '../../../providers/ServiceProvider/hooks';
import { useBookmarksServiceData } from '../../../services/BookmarksService/hooks';
import { BookmarkMap, FlattenedBookmarkTreeNode } from '../../../services/BookmarksService/types';
import { AppDialogs } from '../../../services/ContextService/types';
import { useSettings } from '../../../services/SettingsService/hooks';
import { isModifiable, isRootNode } from '../utils';

interface MenuProps {
  path: string;
  bookmark: FlattenedBookmarkTreeNode | null;
}

export const Menu = ({ path, bookmark }: MenuProps) => {
  const contextService = useContextService();
  const { defaultOpenMap } = useSettings();
  const { map } = useBookmarksServiceData();
  const settingsService = useSettingsService();
  const bookmarksService = useBookmarksService();
  const type = bookmark?.children ? 'folder' : 'bookmark';
  const modifiable = bookmark && isModifiable(bookmark);
  const menuItems = useMemo(() => {
    const isChromeUrl = bookmark?.url?.startsWith('chrome://');
    const incognitoOptions = [
      <MenuItem key='open-new-i-window' onClick={() => openInNewIncognitoWindow(bookmark!.url!)}>
        <ListItemIcon>
          <PreviewIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new incognito window</ListItemText>
      </MenuItem>,
    ];

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
      ...(isChromeUrl ? [] : incognitoOptions),
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

    const openByDefault = bookmark
      ? defaultOpenMap[bookmark.id] === undefined
        ? isRootNode(bookmark)
        : defaultOpenMap[bookmark.id]
      : false;

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
          settingsService.updateSettings({ defaultOpenMap: updatedMap });
          bookmarksService.setOpen(path, updatedMap[bookmark!.id]);
        }}
      >
        <ListItemIcon>
          <FolderOpenIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Set {openByDefault ? 'closed' : 'open'} by default</ListItemText>
      </MenuItem>,
      <Divider key='d2' />,
      <MenuItem key='add-bookmark' onClick={() => contextService.setActiveDialog(AppDialogs.AddBookmark)}>
        <ListItemIcon>
          <BookmarkBorderIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add bookmark</ListItemText>
      </MenuItem>,
      <MenuItem key='add-folder' onClick={() => contextService.setActiveDialog(AppDialogs.AddFolder)}>
        <ListItemIcon>
          <CreateNewFolderOutlinedIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add folder</ListItemText>
      </MenuItem>,
      <Divider key='d3' />,
      <MenuItem key='open-all-children' onClick={() => openAllChildrenInNewTabs(bookmark!, map)}>
        <ListItemIcon>
          <DriveFolderUploadIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open all bookmarks in this folder</ListItemText>
      </MenuItem>,
    ];

    const modifiableOptions = [
      <Divider key='d4' />,
      <MenuItem
        key='edit'
        onClick={() => {
          if (type === 'folder') {
            contextService.setActiveDialog(AppDialogs.EditFolder);
          } else {
            contextService.setActiveDialog(AppDialogs.EditBookmark);
          }
        }}
      >
        <ListItemIcon>
          <EditOutlinedIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Edit {type}</ListItemText>
      </MenuItem>,
      <MenuItem key='delete' onClick={() => contextService.setActiveDialog(AppDialogs.DeleteBookmark)}>
        <ListItemIcon>
          <DeleteOutlineIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Delete {type}</ListItemText>
      </MenuItem>,
    ];

    const colorSelector = [
      <Divider key='d5' />,
      <MenuItem key='color-selector' onClick={() => contextService.setActiveDialog(AppDialogs.ColorSelector)}>
        <ListItemIcon>
          <FormatColorFill fontSize='small' />
        </ListItemIcon>
        <ListItemText>Change folder color</ListItemText>
      </MenuItem>,
    ];

    return [
      ...(type === 'bookmark' ? bookmarkOptions : []),
      ...(type === 'folder' ? folderOptions : []),
      ...(modifiable ? modifiableOptions : []),
      ...(type === 'folder' ? colorSelector : []),
    ];
  }, [
    bookmark,
    bookmarksService,
    contextService,
    defaultOpenMap,
    map,
    modifiable,
    path,
    settingsService,
    type,
  ]);

  return <MenuList dense>{menuItems}</MenuList>;
};

async function openAllChildrenInNewTabs(bookmark: FlattenedBookmarkTreeNode, map: BookmarkMap) {
  const urls: string[] = [];
  walk(bookmark);
  await openTabsInNewGroup(bookmark.title, urls);

  function walk(node: FlattenedBookmarkTreeNode) {
    if (node.children) {
      node.children.forEach((childId) => walk(map[childId]));
    } else {
      urls.push(node.url!);
    }
  }
}
