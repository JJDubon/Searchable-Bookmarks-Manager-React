import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, FormControl, IconButton, MenuItem, PaletteMode, TextField } from '@mui/material';
import { useSettingsService } from '../../providers/ServiceProvider/hooks';
import { useSettings } from '../../services/SettingsService/hooks';
import { SettingsForm, SettingsHeader, SettingsTitle } from './styles';

interface SettingsDrawerProps {
  open: boolean;
  hideSettings: () => void;
}

export const SettingsDrawer = ({ open, hideSettings }: SettingsDrawerProps) => {
  const settingsService = useSettingsService();
  const { palette, iconColor, fontSize, lineHeight, noWrap, escapeBehavior } = useSettings();

  return (
    <Drawer sx={{ zIndex: 'modal' }} anchor={'right'} open={open} onClose={hideSettings}>
      <Box sx={{ width: 400 }}>
        <SettingsForm spacing={3}>
          <SettingsHeader>
            <SettingsTitle variant='h6'>Settings</SettingsTitle>
            <IconButton aria-label='close' onClick={hideSettings}>
              <CloseIcon />
            </IconButton>
          </SettingsHeader>
          <FormControl fullWidth>
            <TextField
              select
              id='app-palette'
              variant='standard'
              label='Theme'
              value={palette}
              onChange={(e) => {
                const value = e.target.value as PaletteMode;
                settingsService.updateSettings({ palette: value });
              }}
            >
              <MenuItem value={'light'}>Light (Default)</MenuItem>
              <MenuItem value={'dark'}>Dark</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='app-icon-color'
              variant='standard'
              label='Icon color'
              value={iconColor}
              onChange={(e) => {
                const value = e.target.value as string;
                settingsService.updateSettings({ iconColor: value });
              }}
            >
              <MenuItem value={'light-blue'}>Light blue</MenuItem>
              <MenuItem value={'blue'}>Blue (Default)</MenuItem>
              <MenuItem value={'white'}>White</MenuItem>
              <MenuItem value={'black'}>Black</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-size-field'
              variant='standard'
              label='Bookmark size'
              value={fontSize}
              onChange={(e) => {
                const value = e.target.value as string;
                settingsService.updateSettings({ fontSize: value });
              }}
            >
              <MenuItem value={'14px'}>Small (Default)</MenuItem>
              <MenuItem value={'16px'}>Medium</MenuItem>
              <MenuItem value={'18px'}>Large</MenuItem>
              <MenuItem value={'24px'}>Very large</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-spacing-field'
              variant='standard'
              label='Bookmark spacing'
              value={lineHeight}
              onChange={(e) => {
                const value = e.target.value as string;
                settingsService.updateSettings({ lineHeight: value });
              }}
            >
              <MenuItem value={'1.25'}>Small</MenuItem>
              <MenuItem value={'1.5'}>Medium (Default)</MenuItem>
              <MenuItem value={'2'}>Large</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-title-field'
              variant='standard'
              label='Titles'
              value={noWrap}
              onChange={(e) => {
                const value = e.target.value as string;
                settingsService.updateSettings({ noWrap: value === 'true' });
              }}
            >
              <MenuItem value={'true'}>Single line (Default)</MenuItem>
              <MenuItem value={'false'}>Multi line</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-title-field'
              variant='standard'
              label='Escape key behavior'
              value={escapeBehavior}
              onChange={(e) => {
                const value = e.target.value as 'clear' | 'close';
                settingsService.updateSettings({ escapeBehavior: value });
              }}
            >
              <MenuItem value={'clear'}>Clear search (Default)</MenuItem>
              <MenuItem value={'close'}>Close extension</MenuItem>
            </TextField>
          </FormControl>
        </SettingsForm>
      </Box>
    </Drawer>
  );
};
