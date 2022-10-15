import { useBookmark } from '../../redux/ducks/bookmarks/selectors';
import { Bookmark } from './bookmark';
import { Folder } from './folder';

interface BookmarkSwitchProps {
  id: string;
  indentLevel?: number;
  defaultOpen?: boolean;
}

export const BookmarkSwitch = ({ 
  id, 
  indentLevel = 0,
  defaultOpen = false,
}: BookmarkSwitchProps) => {
  const bookmark = useBookmark(id);
  if (bookmark.children) {
    return <Folder key={id} id={id} indentLevel={indentLevel} defaultOpen={defaultOpen} />;
  } else {
    return <Bookmark key={id} id={id} indentLevel={indentLevel} />
  }
}