import { Paper, styled } from '@mui/material';

interface ContextMenuContainerProps {
  open: boolean;
  x: number;
  y: number;
}

export const ContextMenuContainer = styled(Paper)<ContextMenuContainerProps>(({ theme, open, x, y }) => ({
  display: open ? 'block' : 'none',
  position: 'fixed',
  left: x,
  top: y,
}));
