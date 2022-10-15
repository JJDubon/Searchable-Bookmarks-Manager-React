import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { Bookmark } from './bookmark';
import { Folder } from './folder';

interface BookmarkSwitchProps {
  id: string;
  indentLevel?: number;
  hideDetails?: boolean;
  forceClose?: boolean;
}

export const BookmarkSwitch = ({
  id,
  indentLevel = 0,
  hideDetails = false,
  forceClose = false,
}: BookmarkSwitchProps) => {
  const bookmark = useBookmark(id);
  if (bookmark.children) {
    return (
      <Folder key={id} id={id} indentLevel={indentLevel} hideDetails={hideDetails} forceClose={forceClose} />
    );
  } else {
    return <Bookmark key={id} id={id} indentLevel={indentLevel} />;
  }
};
