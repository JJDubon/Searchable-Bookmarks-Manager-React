import { useEffect, useState } from "react";
import { BookmarkTreeNode } from "./BookmarkHelpers";

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export function useTree(): { loading: boolean, tree: BookmarkTreeNode[] | null } {
  const [tree, setTree] = useState<BookmarkTreeNode[] | null>(null);
  useEffect(() => {
    const instance = getChromeInstance();
    instance.bookmarks.getTree()
      .then(setTree);
  }, []);

  return { loading: tree === null, tree };
}