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
  isModifiable?: boolean,
  dropType: DropType,
}

export const BookmarkContainer = styled("div")<BookmarkContainerProps>(({
  theme, 
  type,
  isDragging,
  isOpen = false,
  isModifiable = true,
  dropType,
}) => ({
  opacity: isDragging ? 0.5 : 1,
  ...getDragStyles(theme, type,isModifiable, isOpen, dropType)
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

function getDragStyles(theme: Theme, type: BookmarkType, isModifiable: boolean, isOpen: boolean, dropType: DropType) {
  const defaultStyles = { backgroundColor: theme.backgrounds.offset(0), padding: '2px 0' };
  const dropInsideStyles = { backgroundColor: theme.backgrounds.offset(8), padding: '2px 0' };
  const dropAboveStyles = { borderTop: '2px solid gray', paddingBottom: '2px' };
  const dropBelowStyles = { borderBottom: '2px solid gray', paddingTop: '2px' };
  if (type === 'folder') {
    if (!isModifiable) {
      return dropType === null ? defaultStyles : dropInsideStyles;
    } else if (isOpen) {
      switch (dropType) {
        case 'top':
          return dropAboveStyles;
        case 'bottom':
        case 'top-center':
        case 'bottom-center':
          return dropInsideStyles;
        default:
          return defaultStyles;
      }
    } else {
      switch (dropType) {
        case 'top':
          return dropAboveStyles;
        case 'bottom':
          return dropBelowStyles;
        case 'top-center':
        case 'bottom-center':
          return dropInsideStyles;
        default:
          return defaultStyles;
      }
    }
  } else {
    switch (dropType) {
      case 'top':
      case 'top-center':
        return dropAboveStyles;
      case 'bottom':
      case 'bottom-center':
        return dropBelowStyles;
      default:
        return defaultStyles;
    }
  }
}
