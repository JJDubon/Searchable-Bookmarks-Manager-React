import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FlattenedBookmarkTreeNode } from '../../../redux/ducks/bookmarks/state';
import { setContextMenuClose, setContextMenuOpen } from '../../../redux/ducks/context/actions';

interface WithContextMenuProps {
  bookmark: FlattenedBookmarkTreeNode;
  children: JSX.Element;
}

export const WithContextMenu = ({ bookmark, children }: WithContextMenuProps) => {
  const dispatch = useDispatch();
  const closeFn = useCallback(() => {
    dispatch(setContextMenuClose());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('click', closeFn);
    return () => {
      document.removeEventListener('click', closeFn);
    };
  });

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setContextMenuOpen(bookmark, e.pageX, e.pageY));
      }}
    >
      {children}
    </div>
  );
};
