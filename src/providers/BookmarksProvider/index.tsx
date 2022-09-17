import { createContext, useContext, useMemo } from "react";
import { BookmarkMap, createBookmarkMap } from "../../helpers/BookmarkHelpers";
import { useTree } from "../../helpers/ChromeApiHelpers";

export type BookmarksContextType = {
  loading: boolean;
  map: BookmarkMap;
}

const defaultContext: BookmarksContextType = {
  loading: true,
  map: {}
};

export const BookmarksContext = createContext<BookmarksContextType>(defaultContext);

export function useBookmarks(): BookmarksContextType {
  return useContext(BookmarksContext);
}

interface BookmarksProviderProps {
  children?: JSX.Element;
}

export const BookmarksProvider = ({children}: BookmarksProviderProps) => {
  const { loading, tree } = useTree();
  const map = useMemo(() => {
    return createBookmarkMap(tree || []);
  }, [tree]);

  return (
    <BookmarksContext.Provider value={{
      loading,
      map
    }}>
      {children}
    </BookmarksContext.Provider>
  )
}