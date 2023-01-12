import { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useElementSize } from '../../../helpers/BrowserHelpers';
import { useContextServiceData } from '../../../services/ContextService/hooks';
import { Menu } from './menu';
import { ContextMenuContainer } from './styles';

export const ContextMenu = () => {
  const ref = useRef(null);
  const dimensions = useElementSize(ref);
  const { open, path, bookmark, x, y } = useContextServiceData();
  const [delayOpen, setDelayOpen] = useState(false);

  // Small hack to avoid the element popping/snapping
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setDelayOpen(open);
    }, 50);

    return () => clearTimeout(timeout);
  }, [open]);

  const position = getPosition();
  return ReactDOM.createPortal(
    <ContextMenuContainer
      ref={ref}
      open={delayOpen}
      x={position.x}
      y={position.y}
      sx={{ zIndex: 'tooltip', width: 300, maxWidth: '100%' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Menu path={path} bookmark={bookmark} />
    </ContextMenuContainer>,
    document.body
  );

  function getPosition() {
    const adjustedPosition = { x, y };

    if (x + dimensions.width > window.innerWidth) {
      const diff = x + dimensions.width - window.innerWidth;
      adjustedPosition.x -= diff;
    }

    if (y + dimensions.height > window.innerHeight) {
      const diff = y + dimensions.height - window.innerHeight;
      adjustedPosition.y -= diff;
    }

    return adjustedPosition;
  }
};
