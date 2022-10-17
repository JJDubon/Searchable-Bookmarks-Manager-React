import { styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    transition: 'all 100ms ease-in-out',
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.backgrounds.offset(1),
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[theme.palette.mode === 'dark' ? 600 : 300],
    borderRadius: '8px',
  },
}));
