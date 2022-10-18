import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import FolderIcon from '@mui/icons-material/Folder';
import { Collapse, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getIndent } from '../../providers/AppThemeProvider';
import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { setListItemOpen } from '../../redux/ducks/list/actions';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { ActiveBookmarkWrapper } from './active-bookmark-wrapper';
import { BookmarksList } from './bookmark-list';
import { WithContextMenu } from './ContextMenu';
import { useBookmarkDrag, useBookmarkDrop } from './Drag/utils';
import { BookmarkButton, BookmarkContainer, BookmarkIcon, BookmarkPrimaryTextOverrides } from './styles';
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

  return (
    <>
      <WithContextMenu bookmark={folder}>
        <ActiveBookmarkWrapper id={id}>
          <BookmarkContainer
            ref={ref}
            type={'folder'}
            isDragging={isDragging}
            isOpen={open}
            isModifiable={isModifiable(folder)}
            dropType={dropType}
          >
            <BookmarkButton sx={{ pl: getIndent(indentLevel) }} onClick={() => toggleOpen()}>
              <BookmarkIcon>{folderIcon}</BookmarkIcon>
              <ListItemText primary={folder.title} primaryTypographyProps={overrides} />
              {!hideDetails && (
                <motion.div
                  animate={{ rotate: getRotation() }}
                  transition={{ type: 'ease' }}
                  style={{ rotate: getRotation() }}
                >
                  <ExpandLess style={{ opacity: 0.15 }} />
                </motion.div>
              )}
            </BookmarkButton>
          </BookmarkContainer>
        </ActiveBookmarkWrapper>
      </WithContextMenu>
      <Collapse in={open} timeout={150} unmountOnExit>
        <BookmarksList ids={folder.children || []} indentLevel={indentLevel + 1} />
      </Collapse>
    </>
  );

  function getRotation(): number {
    return open ? 0 : 180;
  }

  function toggleOpen(): void {
    if (!forceClose) {
      dispatch(setListItemOpen(folder.id, !open));
    }
  }
};
