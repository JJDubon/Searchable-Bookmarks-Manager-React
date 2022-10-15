import { styled, Typography } from '@mui/material';

export const SettingsHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '-14px',
}));

export const SettingsTitle = styled(Typography)(({ theme }) => ({
  paddingTop: '2px',
}));
