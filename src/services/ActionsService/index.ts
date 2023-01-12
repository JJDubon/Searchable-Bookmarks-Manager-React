import { BehaviorSubject } from 'rxjs';
import { BookmarkTreeNode } from '../BookmarksService/types';
import { BookmarkAction } from './types';

export class ActionsService {
  private stack: BookmarkAction[] = [];
  private currentAction: BookmarkAction | null = null;

  public readonly observables = {
    stack: new BehaviorSubject<BookmarkAction[]>([]),
    currentAction: new BehaviorSubject<BookmarkAction | null>(null),
  };

  public push(action: BookmarkAction, showSnackbar: boolean = true) {
    this.stack.push(action);
    this.currentAction = showSnackbar ? action : null;
    this.onUpdate();
  }

  public pop(): BookmarkAction | null {
    const value = this.stack.pop();
    this.onUpdate();
    return value ?? null;
  }

  public clearCurrentAction() {
    this.currentAction = null;
    this.onUpdate();
  }

  public mapItem(id: string, newNode: BookmarkTreeNode) {
    const targets = [...this.stack];
    if (this.currentAction) {
      targets.push(this.currentAction);
    }

    targets.forEach((item) => {
      mapNode(item.bookmark, newNode, id);
      if ('previousBookmark' in item) {
        mapNode(item.previousBookmark, newNode, id);
      }
    });
  }

  private onUpdate() {
    this.observables.stack.next(this.stack);
    this.observables.currentAction.next(this.currentAction);
  }
}

function mapNode(target: BookmarkTreeNode, node: BookmarkTreeNode, matchId: string) {
  walk(target, (current) => {
    if (current.id === matchId) {
      current.id = node.id;
    }
    if (current.parentId === matchId) {
      current.parentId = node.id;
    }
  });

  function walk(node: BookmarkTreeNode, cb: (node: BookmarkTreeNode) => void) {
    cb(node);
    node.children?.forEach((c) => walk(c, cb));
  }
}
