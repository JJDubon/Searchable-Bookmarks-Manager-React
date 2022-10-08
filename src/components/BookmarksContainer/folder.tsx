import ExpandLess from '@mui/icons-material/ExpandLess';
import FolderIcon from '@mui/icons-material/Folder';
import { Collapse, ListItemText } from '@mui/material';
import { motion } from "framer-motion";
import { useState } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmarks } from "../../providers/BookmarksProvider";
import { useAppSettings } from '../../providers/SettingsProvider';
import { BookmarksList } from './bookmark-list';
import { BookmarkButton, BookmarkIcon } from './styles';

interface FolderProps {
  id: string;
  indentLevel: number;
  defaultOpen?: boolean;
}

export const Folder = ({ id, indentLevel, defaultOpen = false }: FolderProps) => {
  const { map } = useBookmarks();
  const { fontSize } = useAppSettings();
  const [open, setOpen] = useState(defaultOpen);
  const folder = map[id];
  
  return <>
    <BookmarkButton sx={{ pl: getIndent(indentLevel) }} onClick={() => setOpen(!open)}>
      <BookmarkIcon>
        <FolderIcon />
      </BookmarkIcon>
      <ListItemText primary={folder.title} primaryTypographyProps={{fontSize: fontSize, marginTop: "1px"}} />
      <motion.div
        animate={{rotate: getRotation()}}
        transition={{type: "ease"}}
        style={{rotate: getRotation()}}>
        <ExpandLess style={{opacity: 0.15}} />
      </motion.div>
    </BookmarkButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <BookmarksList ids={folder.children || []} indentLevel={indentLevel + 1} />
    </Collapse>
  </>;

  function getRotation(): number {
    return open ? 0 : 180;
  }
}