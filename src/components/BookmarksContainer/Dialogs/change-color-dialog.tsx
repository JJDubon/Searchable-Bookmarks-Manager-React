import FolderIcon from '@mui/icons-material/Folder';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Radio } from '@mui/material';
import * as muiColors from '@mui/material/colors';
import { useMemo, useState } from 'react';
import { useContextServiceData } from '../../../services/ContextService/hooks';

interface ChangeColorDialogProps {
  open: boolean;
  onClose: () => void;
}

enum MuiColor {
  Amber = 'amber',
  Blue = 'blue',
  Brown = 'brown',
  Cyan = 'cyan',
  Green = 'green',
  Grey = 'grey',
  Indigo = 'indigo',
  Lime = 'lime',
  Orange = 'orange',
  Pink = 'pink',
  Purple = 'purple',
  Red = 'red',
  Teal = 'teal',
  Yellow = 'yellow',
}

export const ChangeColorDialog = ({ open, onClose }: ChangeColorDialogProps) => {
  const { bookmark } = useContextServiceData();
  const [color, setColor] = useState(MuiColor.Grey);
  const colors = useMemo(() => {
    return [
      { key: 'grey', props: getProps(color, MuiColor.Grey, setColor) },
      { key: 'brown', props: getProps(color, MuiColor.Brown, setColor) },
      { key: 'pink', props: getProps(color, MuiColor.Pink, setColor) },
      { key: 'red', props: getProps(color, MuiColor.Red, setColor) },
      { key: 'orange', props: getProps(color, MuiColor.Orange, setColor) },
      { key: 'amber', props: getProps(color, MuiColor.Amber, setColor) },
      { key: 'yellow', props: getProps(color, MuiColor.Yellow, setColor) },
      { key: 'purple', props: getProps(color, MuiColor.Purple, setColor) },
      { key: 'indigo', props: getProps(color, MuiColor.Indigo, setColor) },
      { key: 'blue', props: getProps(color, MuiColor.Blue, setColor) },
      { key: 'cyan', props: getProps(color, MuiColor.Cyan, setColor) },
      { key: 'teal', props: getProps(color, MuiColor.Teal, setColor) },
      { key: 'green', props: getProps(color, MuiColor.Green, setColor) },
      { key: 'lime', props: getProps(color, MuiColor.Lime, setColor) },
    ];
  }, [color]);

  if (!bookmark) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FolderIcon sx={{ paddingRight: '12px', fontSize: '1.75rem', color: getMuiColor(color)[600] }} />
          Change folder color
        </div>
      </DialogTitle>
      <DialogContent>
        {colors.map(({ key, props }, i) => {
          if ((i + 1) % 7 === 0) {
            return (
              <>
                <Radio key={key} {...props} />
                <br key={key + '-br'} />
              </>
            );
          } else {
            return <Radio key={key} {...props} />;
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleChange(color)}>Update color</Button>
      </DialogActions>
    </Dialog>
  );

  function handleClose() {
    setColor(MuiColor.Grey);
    onClose();
  }

  async function handleChange(color: MuiColor) {
    setColor(color);
    onClose();
  }
};

function getProps(selectedColor: string, color: MuiColor, onChange: (color: MuiColor) => void) {
  return {
    checked: selectedColor === color,
    onChange: () => onChange(color),
    value: color,
    name: 'color-selector',
    inputProps: { 'aria-label': color },
    sx: {
      color: getMuiColor(color)[600],
      '&.Mui-checked': {
        color: getMuiColor(color)[600],
      },
    },
  };
}

function getMuiColor(color: MuiColor) {
  switch (color) {
    case MuiColor.Amber:
      return muiColors.amber;
    case MuiColor.Blue:
      return muiColors.blue;
    case MuiColor.Brown:
      return muiColors.brown;
    case MuiColor.Cyan:
      return muiColors.cyan;
    case MuiColor.Green:
      return muiColors.green;
    case MuiColor.Grey:
      return muiColors.grey;
    case MuiColor.Indigo:
      return muiColors.indigo;
    case MuiColor.Lime:
      return muiColors.lime;
    case MuiColor.Orange:
      return muiColors.orange;
    case MuiColor.Pink:
      return muiColors.pink;
    case MuiColor.Purple:
      return muiColors.purple;
    case MuiColor.Red:
      return muiColors.red;
    case MuiColor.Teal:
      return muiColors.teal;
    case MuiColor.Yellow:
      return muiColors.yellow;
  }
}
