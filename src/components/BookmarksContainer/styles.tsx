import { ListItemButton, ListItemIcon, styled, Theme, TypographyProps } from "@mui/material";
import { DropType } from "./drag";

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgrounds.offset(1),
  maxWidth: "100%",
  minHeight: "100%",
  padding: "8px 0",
}));

type BookmarkType = 'folder' | 'bookmark';
interface BookmarkContainerProps {
  type: BookmarkType,
  isDragging: boolean,
  isOpen?: boolean,
  dropType: DropType,
}

export const BookmarkContainer = styled("div")<BookmarkContainerProps>(({
  theme, 
  type,
  isDragging,
  isOpen = false,
  dropType,
}) => ({
  opacity: isDragging ? 0.5 : 1,
  ...getDragStyles(theme, type, isOpen, dropType)
}));

export const BookmarkButton = styled(ListItemButton)(({theme}) => ({
  color: theme.bookmarks.fontColor,
  paddingBottom: theme.bookmarks.adjustablePadding(1),
  paddingTop: "0",
})) as typeof ListItemButton;

export const BookmarkIcon = styled(ListItemIcon)(({theme}) => ({
  minWidth: "32px",
  paddingLeft: "8px",
}));

export const BookmarkImg = styled("img")(({theme}) => ({
  paddingLeft: "3px",
  height: "1.5em",
  width: "1.5em",
}));

export const BookmarkPrimaryTextOverrides = (fontSize: string, noWrap: boolean) => {
  let settings: TypographyProps = {
    fontSize: fontSize, 
    marginTop: "1px",
  };

  if (noWrap) {
    settings.overflow = "hidden";
    settings.textOverflow = "ellipsis";
    settings.whiteSpace = "nowrap";
  }

  return settings;
}

function getDragStyles(theme: Theme, type: BookmarkType, isOpen: boolean, dropType: DropType) {
  if (type === 'folder') {
    if (isOpen) {
      switch (dropType) {
        case 'top':
          return { borderTop: '2px solid gray' };
        case 'bottom':
        case 'top-center':
        case 'bottom-center':
          return { backgroundColor: theme.backgrounds.offset(8) };
        default:
          return { backgroundColor: theme.backgrounds.offset(0) };
      }
    } else {
      switch (dropType) {
        case 'top':
          return { borderTop: '2px solid gray' };
        case 'bottom':
          return { borderBottom: '2px solid gray' };
        case 'top-center':
        case 'bottom-center':
          return { backgroundColor: theme.backgrounds.offset(8) };
        default:
          return { backgroundColor: theme.backgrounds.offset(0) };
      }
    }
  } else {
    switch (dropType) {
      case 'top':
      case 'top-center':
        return { borderTop: '2px solid gray' };
      case 'bottom':
      case 'bottom-center':
        return { borderBottom: '2px solid gray' };
      default:
        return { backgroundColor: theme.backgrounds.offset(0) };
    }
  }
}
