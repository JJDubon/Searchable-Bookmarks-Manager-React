import { DialogContentText, styled } from '@mui/material';

export const DialogErrorText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.error.light,
}));

export const DialogContentTitleText = styled(DialogContentText)(({ theme }) => ({
  paddingTop: '6px',
}));

export const BookmarkTitle = styled('span')(({ theme }) => ({
  color: theme.palette.info.main,
}));

export const ColorSelector = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridGap: '4px',
}));
