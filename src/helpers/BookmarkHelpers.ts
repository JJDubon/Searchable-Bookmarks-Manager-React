export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export interface FlattenedBookmarkTreeNode extends Omit<BookmarkTreeNode, "children"> {
  children?: string[];
}

export interface BookmarkMap {
  [id: string]: FlattenedBookmarkTreeNode
}

export function traverseTree(nodes: BookmarkTreeNode[], callback: (node: BookmarkTreeNode) => void): void {
  nodes.forEach((node) => {
    callback(node);
    if (node.children) {
      traverseTree(node.children, callback);
    }
  });
}

export function createBookmarkMap(rootNodes: BookmarkTreeNode[]): BookmarkMap {
  const map: BookmarkMap = {};
  traverseTree(rootNodes, node => {
    map[node.id] = {
      ...node,
      children: node.children?.map(x => x.id)
    };
  });

  return map;
}
