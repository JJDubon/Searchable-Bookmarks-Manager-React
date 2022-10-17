import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, FormControl, IconButton, MenuItem, PaletteMode, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSettings } from '../../redux/ducks/settings/actions';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { useAppIsLoading } from '../../redux/selectors';
import { SettingsForm, SettingsHeader, SettingsTitle } from './styles';

interface SettingsDrawerProps {
  open: boolean;
  hideSettings: () => void;
}

export const SettingsDrawer = ({ open, hideSettings }: SettingsDrawerProps) => {
  const loading = useAppIsLoading();
  const dispatch = useDispatch();
  const { palette, fontSize, padding, noWrap } = useSettings();

  if (loading) {
    return <></>;
  }

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
                dispatch(setSettings({ palette: value }));
              }}
            >
              <MenuItem value={'light'}>Light (Default)</MenuItem>
              <MenuItem value={'dark'}>Dark</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-size-field'
              variant='standard'
              label='Bookmark Size'
              value={fontSize}
              onChange={(e) => {
                const value = e.target.value as string;
                dispatch(setSettings({ fontSize: value }));
              }}
            >
              <MenuItem value={'14px'}>Small (Default)</MenuItem>
              <MenuItem value={'16px'}>Medium</MenuItem>
              <MenuItem value={'18px'}>Large</MenuItem>
              <MenuItem value={'24px'}>Very Large</MenuItem>
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              select
              id='bookmark-spacing-field'
              variant='standard'
              label='Bookmark Spacing'
              value={padding}
              onChange={(e) => {
                const value = e.target.value as string;
                dispatch(setSettings({ padding: value }));
              }}
            >
              <MenuItem value={'0px'}>Small (Default)</MenuItem>
              <MenuItem value={'2px'}>Medium</MenuItem>
              <MenuItem value={'4px'}>Large</MenuItem>
              <MenuItem value={'8px'}>Very Large</MenuItem>
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
                dispatch(setSettings({ noWrap: value === 'true' }));
              }}
            >
              <MenuItem value={'true'}>Single Line</MenuItem>
              <MenuItem value={'false'}>Multi line</MenuItem>
            </TextField>
          </FormControl>
        </SettingsForm>
      </Box>
    </Drawer>
  );
};
