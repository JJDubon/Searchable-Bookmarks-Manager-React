import { ListItemButton, ListItemIcon, styled } from "@mui/material";

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgrounds.offset(2),
  maxWidth: "100%",
  minHeight: "100%",
  padding: "8px 0",
}));

export const BookmarkButton = styled(ListItemButton)(({theme}) => ({
  color: theme.bookmarks.fontColor,
  paddingBottom: theme.bookmarks.adjustablePadding(1),
  paddingTop: "0",
})) as typeof ListItemButton;

export const BookmarkIcon = styled(ListItemIcon)(({theme}) => ({
  minWidth: "34px",
  paddingLeft: "8px",
}));

export const BookmarkImg = styled("img")(({theme}) => ({
  paddingLeft: "3px",
  height: "1.5em",
  width: "1.5em",
}));

