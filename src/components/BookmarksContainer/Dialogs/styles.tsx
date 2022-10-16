import { DialogContentText, styled } from '@mui/material';

export const DialogErrorText = styled(DialogContentText)(({ theme }) => ({
  color: theme.palette.error.light,
}));
