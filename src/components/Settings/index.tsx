import { Box, Drawer } from '@mui/material';

interface SettingsDrawerProps {
  open: boolean;
  hideSettings: () => void;
}

export const SettingsDrawer = ({open, hideSettings}: SettingsDrawerProps) => {
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={hideSettings}
    >
      <Box sx={{width: 250}}>
        
      </Box>
    </Drawer>
  )
}