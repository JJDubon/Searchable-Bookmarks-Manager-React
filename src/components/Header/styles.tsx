import { styled, TextField } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.backgrounds.offset(12) : theme.backgrounds.offset(3),
  borderBottom: `2px solid ${theme.backgrounds.offset(8)}`,
  display: 'flex',
  height: '100%',
  padding: '0 18px',
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
}));
