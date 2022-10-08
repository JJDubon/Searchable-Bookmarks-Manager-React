import { ListItemButton, ListItemIcon, styled } from "@mui/material";

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgrounds.offset(2),
  padding: "8px 0",
  maxWidth: "100%",
  minHeight: "100%",
}));

export const BookmarkButton = styled(ListItemButton)(({theme}) => ({
  paddingBottom: theme.bookmarks.adjustablePadding(1),
  paddingTop: "0",
}));

export const BookmarkIcon = styled(ListItemIcon)(({theme}) => ({
  minWidth: "34px",
  paddingLeft: "8px",
}));

