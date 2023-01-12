import { useBookmark } from '../../services/BookmarksService/hooks';
import { Bookmark } from './bookmark';
import { Folder } from './folder';

interface BookmarkSwitchProps {
  id: string;
  path: string;
  indentLevel?: number;
  hideDetails?: boolean;
  forceClose?: boolean;
}

export const BookmarkSwitch = ({
  id,
  path,
  indentLevel = 0,
  hideDetails = false,
  forceClose = false,
}: BookmarkSwitchProps) => {
  const bookmark = useBookmark(id);
  if (!bookmark) {
    return <></>;
  }
  if (bookmark.children) {
    return (
      <Folder
        id={id}
        path={path}
        indentLevel={indentLevel}
        hideDetails={hideDetails}
        forceClose={forceClose}
      />
    );
  } else {
    return <Bookmark id={id} path={path} indentLevel={indentLevel} />;
  }
};
