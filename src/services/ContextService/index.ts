import { BehaviorSubject } from 'rxjs';
import { emitIfModified } from '../../helpers/RxjsHelpers';
import { FlattenedBookmarkTreeNode } from '../BookmarksService/types';
import { AppDialogs } from './types';

export class ContextService {
  private open: boolean = false;
  private path: string = '';
  private bookmark: FlattenedBookmarkTreeNode | null = null;
  private x: number = 0;
  private y: number = 0;
  private activeDialog: AppDialogs = AppDialogs.None;

  public readonly observables = {
    open: new BehaviorSubject<boolean>(false),
    path: new BehaviorSubject<string>(''),
    bookmark: new BehaviorSubject<FlattenedBookmarkTreeNode | null>(null),
    position: new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 }),
    activeDialog: new BehaviorSubject<AppDialogs>(AppDialogs.None),
  };

  public openMenu(path: string, bookmark: FlattenedBookmarkTreeNode, x: number, y: number) {
    this.open = true;
    this.path = path;
    this.bookmark = bookmark;
    this.x = x;
    this.y = y;

    this.onUpdate();
  }

  public closeMenu() {
    this.open = false;
    this.onUpdate();
  }

  public setActiveDialog(dialog: AppDialogs) {
    this.activeDialog = dialog;
    if (dialog === AppDialogs.None) {
      this.bookmark = null;
    }

    this.onUpdate();
  }

  private onUpdate() {
    emitIfModified(this.observables.open, this.open);
    emitIfModified(this.observables.path, this.path);
    emitIfModified(this.observables.bookmark, this.bookmark);
    emitIfModified(this.observables.position, { x: this.x, y: this.y });
    emitIfModified(this.observables.activeDialog, this.activeDialog);
  }
}
