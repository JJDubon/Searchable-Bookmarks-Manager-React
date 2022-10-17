import { styled } from '@mui/material';

export const Frame = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',

  display: 'grid',
  gridTemplateRows: `86px 1fr`,
}));
