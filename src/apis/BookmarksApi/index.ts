import { BehaviorSubject } from 'rxjs';
import { createBookmarkMap, createOpenMap, toLinearList } from '../../helpers/BookmarkHelpers';
import { getTree, searchTree } from '../../helpers/ChromeApiHelpers';
import { emitIfModified } from '../../helpers/RxjsHelpers';
import { BookmarkMap, BookmarkTreeNode, OpenMap } from './types';

export class BookmarksApi {
  private map: BookmarkMap = {};
  private rootNodes: string[] = [];
  private activeNodes: string[] = [];
  private openMap: OpenMap = {};
  private searchResultsOpenMap: OpenMap = {};
  private query: string = '';
  private activePath: string | null = null;
  private linearList: string[] = [];

  private resetEventFn = this.resetTree.bind(this);

  public readonly observables = {
    map: new BehaviorSubject<BookmarkMap>({}),
    rootNodes: new BehaviorSubject<string[]>([]),
    activeNodes: new BehaviorSubject<string[]>([]),
    openMap: new BehaviorSubject<OpenMap>({}),
    searchResultsOpenMap: new BehaviorSubject<OpenMap>({}),
    query: new BehaviorSubject<string>(''),
    activePath: new BehaviorSubject<string | null>(null),
    linearList: new BehaviorSubject<string[]>([]),
  };

  constructor(tree: BookmarkTreeNode[] = [], defaultOpenMap: OpenMap = {}) {
    chrome.bookmarks.onChanged.addListener(this.resetEventFn);
    chrome.bookmarks.onChildrenReordered.addListener(this.resetEventFn);
    chrome.bookmarks.onCreated.addListener(this.resetEventFn);
    chrome.bookmarks.onMoved.addListener(this.resetEventFn);
    chrome.bookmarks.onRemoved.addListener(this.resetEventFn);
    this.loadTree(tree, defaultOpenMap);
  }

  public loadTree(tree: BookmarkTreeNode[], defaultOpenMap: OpenMap) {
    addBookmarksManagerNode(tree);

    this.map = createBookmarkMap(tree);
    this.rootNodes = tree[0]?.children?.map((x) => x.id) || [];

    this.openMap = { ...defaultOpenMap };
    this.rootNodes.forEach((nodeId, index) => {
      const path = `/root[${index}]/${nodeId}`;
      if (this.openMap[path] === undefined) {
        this.openMap[path] = true;
      }
    });

    if (this.query.trim().length === 0) {
      this.activeNodes = this.rootNodes;
    } else {
      this.search(this.query);
    }

    this.onUpdate(defaultOpenMap);
  }

  public async resetTree() {
    const tree = await getTree();
    this.loadTree(tree, this.openMap);
    this.onUpdate();
  }

  public async search(query: string) {
    this.query = query?.trim() ?? '';
    if (query.length !== 0) {
      const nodes = await searchTree(query);
      this.activeNodes = nodes.map((node) => node.id);
    } else {
      this.activeNodes = [...this.rootNodes];
    }

    this.onUpdate();
  }

  public setOpen(path: string, open: boolean) {
    if (this.query.length !== 0) {
      this.searchResultsOpenMap[path] = open;
    } else {
      this.openMap[path] = open;
    }

    this.onUpdate();
  }

  public setActivePath(path: string | null) {
    this.activePath = path;
    this.onUpdate();
  }

  private onUpdate(defaultOpenMap?: OpenMap) {
    if (this.query) {
      this.searchResultsOpenMap = createOpenMap(this.activeNodes, this.map, this.searchResultsOpenMap);
      this.linearList = toLinearList(this.activeNodes, this.map, this.searchResultsOpenMap);
    } else {
      this.openMap = createOpenMap(this.activeNodes, this.map, this.openMap, defaultOpenMap);
      this.linearList = toLinearList(this.activeNodes, this.map, this.openMap);
    }

    emitIfModified(this.observables.map, this.map);
    emitIfModified(this.observables.rootNodes, this.rootNodes);
    emitIfModified(this.observables.activeNodes, this.activeNodes);
    emitIfModified(this.observables.openMap, this.openMap);
    emitIfModified(this.observables.searchResultsOpenMap, this.searchResultsOpenMap);
    emitIfModified(this.observables.query, this.query);
    emitIfModified(this.observables.activePath, this.activePath);
    emitIfModified(this.observables.linearList, this.linearList);
  }
}

function addBookmarksManagerNode(root: BookmarkTreeNode[]) {
  if (root && root[0]) {
    const rootNode = root[0];
    rootNode.children?.push({
      id: '__bookmarks-manager',
      index: rootNode.children.length,
      title: 'Bookmarks Manager',
      url: 'chrome://bookmarks/',
      unmodifiable: 'managed',
    });
  }
}
