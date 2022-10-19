import { styled, TextField } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.backgrounds.offset(12) : theme.backgrounds.offset(3),
  borderBottom: `2px solid ${theme.palette.grey[theme.palette.mode === 'dark' ? 600 : 300]}`,
  boxSizing: 'border-box',
  display: 'flex',
  height: '100%',
  padding: '0 6px',
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  '& > label': {
    fontSize: '18px',
  },
  '& > *': {
    backgroundColor: 'transparent !important',
  },
}));
