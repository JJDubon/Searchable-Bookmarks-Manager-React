import { useEffect, useState } from "react";
import { BookmarkTreeNode } from "../redux/ducks/bookmarks/state";

export function getChromeInstance(): typeof chrome {
  const browserInstance = window.chrome || (window as any)['browser'];
  return browserInstance;
}

export async function getTree(): Promise<BookmarkTreeNode[]> {
  const instance = getChromeInstance();
  return new Promise((resolve, reject) => {
    instance.bookmarks.getTree((results) => {
      resolve(results);
    })
  });
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
