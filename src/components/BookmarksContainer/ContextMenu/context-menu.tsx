import { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useElementSize } from '../../../helpers/BrowserHelpers';
import { useContextState } from '../../../redux/ducks/context/selectors';
import { Menu } from './menu';
import { ContextMenuContainer } from './styles';

export const ContextMenu = () => {
  const ref = useRef(null);
  const dimensions = useElementSize(ref);
  const { open, bookmark, x, y } = useContextState();
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
      <Menu bookmark={bookmark} />
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
