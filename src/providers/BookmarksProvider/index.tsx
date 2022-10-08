import { createContext, useContext, useMemo } from "react";
import { BookmarkMap, createBookmarkMap } from "../../helpers/BookmarkHelpers";
import { useTree } from "../../helpers/ChromeApiHelpers";

export type BookmarksContextType = {
  loading: boolean;
  root: string[];
  map: BookmarkMap;
}

const defaultValues: BookmarksContextType = {
  loading: true,
  root: [],
  map: {}
};

export const BookmarksContext = createContext<BookmarksContextType>(defaultValues);

export function useBookmarks(): BookmarksContextType {
  return useContext(BookmarksContext);
}

interface BookmarksProviderProps {
  children?: JSX.Element;
}

export const BookmarksProvider = ({children}: BookmarksProviderProps) => {
  const { loading, tree } = useTree();

  const root = useMemo(() => {
    if (tree) {
      return tree[0]?.children?.map(x => x.id) || [];
    } else {
      return [];
    }
  }, [tree]);

  const map = useMemo(() => {
    return createBookmarkMap(tree || []);
  }, [tree]);

  return (
    <BookmarksContext.Provider value={{
      loading,
      root,
      map
    }}>
      {children}
    </BookmarksContext.Provider>
  );
}