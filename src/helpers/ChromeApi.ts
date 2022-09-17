import { useEffect, useState } from "react";

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export function useTree(): { loading: boolean, tree: chrome.bookmarks.BookmarkTreeNode[] | null } {
  const [tree, setTree] = useState<chrome.bookmarks.BookmarkTreeNode[] | null>(null);
  useEffect(() => {
    const instance = getChromeInstance();
    instance.bookmarks.getTree()
      .then(setTree);
  }, []);

  return { loading: tree === null, tree };
}