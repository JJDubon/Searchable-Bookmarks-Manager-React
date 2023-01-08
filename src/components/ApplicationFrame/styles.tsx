import { styled } from '@mui/material';

export const Frame = styled('div')(({ theme }) => ({
  height: '600px',
  width: '500px',
  overflow: 'hidden',

  display: 'grid',
  gridTemplateRows: `68px 1fr`,
}));
