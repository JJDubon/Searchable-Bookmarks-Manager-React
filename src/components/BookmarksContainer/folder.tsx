import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import FolderIcon from '@mui/icons-material/Folder';
import { Collapse, ListItemText } from '@mui/material';
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from 'react';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { BookmarksList } from './bookmark-list';
import { useBookmarkDrag, useBookmarkDrop } from './drag';
import { BookmarkButton, BookmarkContainer, BookmarkIcon, BookmarkPrimaryTextOverrides } from './styles';
import { isModifiable } from './utils';

interface FolderProps {
  id: string;
  indentLevel: number;
  defaultOpen?: boolean;
}

export const Folder = ({ id, indentLevel, defaultOpen = false }: FolderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const folder = useBookmark(id);
  const { isDragging } = useBookmarkDrag(id,ref);
  const { dropType } = useBookmarkDrop(id, ref);
  const { fontSize, noWrap } = useSettings();
  const [open, setOpen] = useState(defaultOpen);
  const overrides = useMemo(() => {
    return BookmarkPrimaryTextOverrides(fontSize, noWrap);
  }, [fontSize, noWrap]);
  
  return <>
    <BookmarkContainer ref={ref} type={'folder'} isDragging={isDragging} isOpen={open} isModifiable={isModifiable(folder)} dropType={dropType}>
      <BookmarkButton sx={{ pl: getIndent(indentLevel) }} onClick={() => setOpen(!open)}>
        <BookmarkIcon>
          {getFolderIcon()}
        </BookmarkIcon>
        <ListItemText
          primary={folder.title}
          primaryTypographyProps={overrides} />
        <motion.div
          animate={{rotate: getRotation()}}
          transition={{type: "ease"}}
          style={{rotate: getRotation()}}>
          <ExpandLess style={{opacity: 0.15}} />
        </motion.div>
      </BookmarkButton>
    </BookmarkContainer>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <BookmarksList ids={folder.children || []} indentLevel={indentLevel + 1} />
    </Collapse>
  </>;

  function getFolderIcon(): JSX.Element {
    const isCenter = dropType === 'top-center' || dropType === 'bottom-center';
    const isBottom = dropType === 'bottom';
    if (open) {
      if (isCenter || isBottom) {
        return <CreateNewFolderIcon />;
      } else {
        return <FolderIcon />;
      }
    } else {
      if (isCenter) {
        return <CreateNewFolderIcon />;
      } else {
        return <FolderIcon />;
      }
    }
  }

  function getRotation(): number {
    return open ? 0 : 180;
  }
}