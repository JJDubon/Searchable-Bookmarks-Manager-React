import { BookmarkMap, BookmarkTreeNode, OpenMap } from '../redux/ducks/bookmarks/store';

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
  traverseTree(rootNodes, (node) => {
    map[node.id] = {
      ...node,
      children: node.children?.map((x) => x.id),
    };
  });

  return map;
}

export function createOpenMap(
  nodes: string[],
  map: BookmarkMap,
  previousMap: OpenMap,
  defaultOpenMap?: OpenMap
): OpenMap {
  const openMap: OpenMap = {};

  nodes.forEach((id, index) => {
    walk(id, `/root[${index}]`);
  });

  return openMap;

  function walk(nodeId: string, path: string) {
    path = `${path}/${nodeId}`;

    const bookmark = map[nodeId];
    if (bookmark && bookmark.children) {
      const isOpen =
        previousMap[path] ||
        (defaultOpenMap && defaultOpenMap[nodeId] !== undefined && defaultOpenMap[nodeId]);
      openMap[path] = !!isOpen;

      bookmark.children.forEach((childId, index) => {
        walk(childId, `${path}[${index}]`);
      });
    }
  }
}

export function toLinearList(nodes: string[], map: BookmarkMap, openMap: OpenMap): string[] {
  const list: string[] = [];

  nodes.forEach((id, index) => {
    walk(id, `/root[${index}]`);
  });

  return list;

  function walk(nodeId: string, path: string) {
    path = `${path}/${nodeId}`;
    list.push(path);

    const bookmark = map[nodeId];
    if (bookmark && bookmark.children && openMap[path]) {
      bookmark.children.forEach((childId, index) => {
        walk(childId, `${path}[${index}]`);
      });
    }
  }
}
