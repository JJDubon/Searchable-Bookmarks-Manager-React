import { useCallback, useEffect } from 'react';
import { useContextService } from '../../../providers/ServiceProvider/hooks';
import { FlattenedBookmarkTreeNode } from '../../../services/BookmarksService/types';

interface WithContextMenuProps {
  path: string;
  bookmark: FlattenedBookmarkTreeNode;
  children: JSX.Element;
}

export const WithContextMenu = ({ path, bookmark, children }: WithContextMenuProps) => {
  const contextService = useContextService();
  const closeFn = useCallback(() => {
    contextService.closeMenu();
  }, [contextService]);

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
        contextService.openMenu(path, bookmark, e.pageX, e.pageY);
      }}
    >
      {children}
    </div>
  );
};
