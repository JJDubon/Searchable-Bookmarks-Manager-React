import { createContext, useContext } from "react";
import { useTree } from "../../helpers/ChromeApi";

export type BookmarksContextType = {
  loading: boolean;
  tree: chrome.bookmarks.BookmarkTreeNode[] | null;
}

const defaultContext: BookmarksContextType = {
  loading: true,
  tree: null
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

  return (
    <BookmarksContext.Provider value={{
      loading,
      tree: tree
    }}>
      {children}
    </BookmarksContext.Provider>
  )
}