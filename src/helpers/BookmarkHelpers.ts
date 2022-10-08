import { BookmarkTreeNode, BookmarkMap } from "../redux/ducks/bookmarks/state";

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
