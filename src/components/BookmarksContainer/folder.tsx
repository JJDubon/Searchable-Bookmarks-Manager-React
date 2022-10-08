import FolderIcon from '@mui/icons-material/Folder';
import { Collapse, ListItemText } from '@mui/material';
import { useState } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { BookmarksList } from './bookmark-list';
import { BookmarkButton, BookmarkIcon } from './styles';

interface FolderProps {
  id: string;
  indentLevel: number;
  defaultOpen?: boolean;
}

export const Folder = ({ id, indentLevel, defaultOpen = false }: FolderProps) => {
  const { map } = useBookmarks();
  const [open, setOpen] = useState(defaultOpen);
  const folder = map[id];
  return <>
    <BookmarkButton sx={{ pl: getIndent(indentLevel) }} onClick={() => setOpen(!open)}>
      <BookmarkIcon>
        <FolderIcon />
      </BookmarkIcon>
      <ListItemText primary={folder.title} />
    </BookmarkButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <BookmarksList ids={folder.children || []} indentLevel={indentLevel + 1} />
    </Collapse>
  </>;
}