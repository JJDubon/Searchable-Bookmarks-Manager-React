import FolderIcon from '@mui/icons-material/Folder';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Radio } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getMuiColor } from '../../../helpers/ColorHelpers';
import { useSettingsService } from '../../../providers/ServiceProvider/hooks';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { useSettings } from '../../../services/SettingsService/hooks';
import { FolderColor } from '../../../services/SettingsService/types';

interface ChangeColorDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChangeColorDialog = ({ open, onClose }: ChangeColorDialogProps) => {
  const settingsService = useSettingsService();
  const settings = useSettings();
  const { bookmark } = useContextServiceData();
  const [color, setColor] = useState(FolderColor.Grey);
  const intensity = settings.palette === 'dark' ? 300 : 600;

  useEffect(() => {
    if (bookmark && settings.colorMap && settings.colorMap[bookmark.id]) {
      setColor(settings.colorMap[bookmark.id] as FolderColor);
    } else {
      setColor(FolderColor.Grey);
    }
  }, [settings, bookmark, bookmark?.id]);

  const colors = useMemo(() => {
    return [
      { key: FolderColor.Grey, props: getProps(color, FolderColor.Grey, intensity, setColor) },
      { key: FolderColor.Brown, props: getProps(color, FolderColor.Brown, intensity, setColor) },
      { key: FolderColor.Pink, props: getProps(color, FolderColor.Pink, intensity, setColor) },
      { key: FolderColor.Red, props: getProps(color, FolderColor.Red, intensity, setColor) },
      { key: FolderColor.Orange, props: getProps(color, FolderColor.Orange, intensity, setColor) },
      { key: FolderColor.Amber, props: getProps(color, FolderColor.Amber, intensity, setColor) },
      { key: FolderColor.Yellow, props: getProps(color, FolderColor.Yellow, intensity, setColor) },
      { key: FolderColor.Purple, props: getProps(color, FolderColor.Purple, intensity, setColor) },
      { key: FolderColor.Indigo, props: getProps(color, FolderColor.Indigo, intensity, setColor) },
      { key: FolderColor.Blue, props: getProps(color, FolderColor.Blue, intensity, setColor) },
      { key: FolderColor.Cyan, props: getProps(color, FolderColor.Cyan, intensity, setColor) },
      { key: FolderColor.Teal, props: getProps(color, FolderColor.Teal, intensity, setColor) },
      { key: FolderColor.Green, props: getProps(color, FolderColor.Green, intensity, setColor) },
      { key: FolderColor.Lime, props: getProps(color, FolderColor.Lime, intensity, setColor) },
    ];
  }, [color, intensity]);

  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FolderIcon
            sx={{ paddingRight: '12px', fontSize: '1.75rem', color: getMuiColor(color)[intensity] }}
          />
          Change folder color
        </div>
      </DialogTitle>
      <DialogContent>
        {colors.map(({ key, props }, i) => {
          return <Radio {...props} key={key} />;
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleChange(color)}>Update color</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setColor(FolderColor.Grey);
    onClose();
  }

  async function handleChange(color: FolderColor) {
    if (bookmark) {
      settingsService.setColor(bookmark.id, color);
    }

    setColor(color);
    onClose();
  }
};

function getProps(
  selectedColor: string,
  color: FolderColor,
  intensity: 300 | 600,
  onChange: (color: FolderColor) => void
) {
  return {
    key: color,
    checked: selectedColor === color,
    onChange: () => onChange(color),
    value: color,
    name: 'color-selector',
    inputProps: { 'aria-label': color },
    sx: {
      color: getMuiColor(color)[intensity],
      '&.Mui-checked': {
        color: getMuiColor(color)[intensity],
      },
    },
  };
}
