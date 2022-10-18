import { BookmarkTreeNode, BookmarkMap } from '../redux/ducks/bookmarks/state';
import { OpenMap } from '../redux/ducks/list/state';

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

export function createOpenMap(defaultOpenMap: OpenMap, openMap: OpenMap, activeNodes: string[]) {
  const result: OpenMap = { ...defaultOpenMap, ...openMap };
  activeNodes.forEach((nodeId) => {
    if (result[nodeId] === undefined) {
      result[nodeId] = true;
    }
  });

  return result;
}

export function toLinearList(activeNodes: string[], map: BookmarkMap, openMap: OpenMap) {
  const list: string[] = [];

  activeNodes.forEach((id) => {
    walk(id);
  });

  return list;

  function walk(nodeId: string) {
    list.push(nodeId);

    const bookmark = map[nodeId];
    if (bookmark.children && openMap[bookmark.id]) {
      bookmark.children.forEach((childId) => walk(childId));
    }
  }
}
