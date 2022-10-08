import { Box, Drawer, FormControl, MenuItem, Stack, styled, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { SettingsContextType, useAppSettings } from '../../providers/SettingsProvider';

const SettingsForm = styled(Stack)(({theme}) => ({
  padding: "12px"
}));

interface SettingsDrawerProps {
  open: boolean;
  hideSettings: () => void;
}

export const SettingsDrawer = ({open, hideSettings}: SettingsDrawerProps) => {
  const settings = useAppSettings();
  const [fontSize, setFontSize] = useState(settings.fontSize);
  const [padding, setPadding] = useState(settings.padding);

  useEffect(() => {
    chrome.storage.local.set({
      fontSize,
      padding
    } as SettingsContextType);
  }, [fontSize, padding]);

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={hideSettings}
    >
      <Box sx={{width: 400}}>
        <SettingsForm spacing={3}>
          <FormControl fullWidth>
            <TextField
              select
              id="bookmark-size-field"
              variant="standard"
              label="Bookmark Size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as string)}
            >
              <MenuItem value={"14px"}>Small (Default)</MenuItem>
              <MenuItem value={"16px"}>Medium</MenuItem>
              <MenuItem value={"18px"}>Large</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id="bookmark-size-field"
              variant="standard"
              label="Bookmark Spacing"
              value={padding}
              onChange={(e) => setPadding(e.target.value as string)}
            >
              <MenuItem value={"2px"}>Small (Default)</MenuItem>
              <MenuItem value={"4px"}>Medium</MenuItem>
              <MenuItem value={"8px"}>Large</MenuItem>
            </TextField>
          </FormControl>
        </SettingsForm>
      </Box>
    </Drawer>
  );
}