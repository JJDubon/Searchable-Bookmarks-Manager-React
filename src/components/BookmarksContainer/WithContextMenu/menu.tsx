import AddLinkIcon from '@mui/icons-material/AddLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
import { FlattenedBookmarkTreeNode } from '../../../redux/ducks/bookmarks/state';
import { isModifiable } from '../utils';

interface MenuProps {
  bookmark: FlattenedBookmarkTreeNode | null;
}

export const Menu = ({ bookmark }: MenuProps) => {
  const type = bookmark?.children ? 'folder' : 'bookmark';
  const modifiable = bookmark && isModifiable(bookmark);
  const menuItems = useMemo(() => {
    const bookmarkOptions = [
      <MenuItem>
        <ListItemIcon>
          <ExitToAppIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in current tab</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <TabIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new tab</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <OpenInNewIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new window</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <PreviewIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Open in new incognito window</ListItemText>
      </MenuItem>,
      <Divider />,
      <MenuItem>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy title</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <AddLinkIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy link</ListItemText>
      </MenuItem>,
    ];

    const folderOptions = [
      <MenuItem>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Copy title</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <FolderOpenIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Toggle open by default</ListItemText>
      </MenuItem>,
      <Divider />,
      <MenuItem>
        <ListItemIcon>
          <ContentCopyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add Bookmark</ListItemText>
      </MenuItem>,
      <MenuItem>
        <ListItemIcon>
          <AddLinkIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Add Folder</ListItemText>
      </MenuItem>,
    ];

    const modifiableOptions = [
      <Divider />,
      <MenuItem>
        <ListItemIcon>
          <EditIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>Edit {type}</ListItemText>
      </MenuItem>,
      <MenuItem>
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
  }, [type, modifiable]);

  return <MenuList dense>{menuItems}</MenuList>;
};
