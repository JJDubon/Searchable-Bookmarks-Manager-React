import { ListItemButton, ListItemIcon, styled, Theme, TypographyProps } from '@mui/material';
import { BookmarkType, DropType, getDropBehavior } from './utils';

export const Container = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  backgroundColor: theme.backgrounds.offset(1),
  maxWidth: '100%',
  minHeight: '100%',
  padding: '8px 0',
}));

interface BookmarkContainerProps {
  type: BookmarkType;
  isDragging: boolean;
  isOpen?: boolean;
  isModifiable?: boolean;
  dropType: DropType;
}

export const BookmarkContainer = styled('div')<BookmarkContainerProps>(
  ({ theme, type, isDragging, isOpen = false, isModifiable = true, dropType }) => ({
    opacity: isDragging ? 0.5 : 1,
    ...getDragStyles(theme, type, isModifiable, isOpen, dropType),
  })
);

interface ActiveHighlightProps {
  active: boolean;
}

export const ActiveHighlight = styled('div')<ActiveHighlightProps>(({ theme, active }) => ({
  backgroundColor: active ? 'gray' : 'transparent',
}));

export const BookmarkButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingBottom: theme.bookmarks.adjustablePadding(1),
  paddingTop: '0',
})) as typeof ListItemButton;

export const BookmarkIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '32px',
  paddingLeft: '8px',
}));

export const BookmarkImg = styled('img')(({ theme }) => ({
  paddingLeft: '3px',
  height: '1.5em',
  width: '1.5em',
}));

export const BookmarkPrimaryTextOverrides = (fontSize: string, noWrap: boolean) => {
  let settings: TypographyProps = {
    fontSize: fontSize,
    marginTop: '1px',
  };

  if (noWrap) {
    settings.overflow = 'hidden';
    settings.textOverflow = 'ellipsis';
    settings.whiteSpace = 'nowrap';
  }

  return settings;
};

function getDragStyles(
  theme: Theme,
  type: BookmarkType,
  isModifiable: boolean,
  isOpen: boolean,
  dropType: DropType
) {
  switch (getDropBehavior(type, isModifiable, isOpen, dropType)) {
    case 'above':
      return { borderTop: '2px solid gray', paddingBottom: '2px' };
    case 'below':
      return { borderBottom: '2px solid gray', paddingTop: '2px' };
    case 'inside':
      return { backgroundColor: theme.backgrounds.offset(8), padding: '2px 0' };
    default:
      return { backgroundColor: theme.backgrounds.offset(0), padding: '2px 0' };
  }
}
