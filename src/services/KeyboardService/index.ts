import { fromEvent, Subject } from 'rxjs';
import { inverseAction } from '../../components/BookmarksContainer/action-snackbar';
import { openInCurrentTab } from '../../helpers/ChromeApiHelpers';
import { ActionsService } from '../ActionsService';
import { BookmarkAction } from '../ActionsService/types';
import { BookmarksService } from '../BookmarksService';
import { BookmarkMap, OpenMap } from '../BookmarksService/types';
import { SettingsService } from '../SettingsService';

export class KeyboardService {
  private activeIndex: number | null = null;
  private linearList: string[] = [];
  private actionStack: BookmarkAction[] = [];
  private bookmarkMap: BookmarkMap = {};
  private openMap: OpenMap = {};
  private searchResultsOpenMap: OpenMap = {};
  private inSearchMode = false;

  public observables = {
    escapeKeyPressed: new Subject<KeyboardEvent>(),
    onKeyPressed: new Subject<KeyboardEvent>(),
  };

  constructor(
    private bookmarksService: BookmarksService,
    private settingsService: SettingsService,
    private actionsService: ActionsService
  ) {
    bookmarksService.observables.linearList.subscribe((list) => {
      this.linearList = list;
    });

    bookmarksService.observables.query.subscribe((query) => {
      this.inSearchMode = query.length !== 0;
    });

    bookmarksService.observables.map.subscribe((map) => {
      this.bookmarkMap = map;
    });

    bookmarksService.observables.openMap.subscribe((map) => {
      this.openMap = map;
    });

    bookmarksService.observables.searchResultsOpenMap.subscribe((map) => {
      this.searchResultsOpenMap = map;
    });

    actionsService.observables.stack.subscribe((stack) => {
      this.actionStack = stack;
    });

    fromEvent(document, 'keydown').subscribe((ev) => {
      this.onKeyDown(ev as KeyboardEvent);
      this.observables.onKeyPressed.next(ev as KeyboardEvent);
    });

    fromEvent(document, 'mousemove').subscribe(() => {
      this.activeIndex = null;
      this.bookmarksService.setActivePath(null);
    });

    fromEvent(document, 'mousedown').subscribe(() => {
      this.activeIndex = null;
      this.bookmarksService.setActivePath(null);
    });
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }

    if (e.key === 'Enter') {
      if (this.activeIndex !== null) {
        const path = this.linearList[this.activeIndex];
        const id = path.match(/([^/]+$)/)![0];
        const bookmark = this.bookmarkMap[id];
        if (bookmark.children) {
          const isOpen = (this.inSearchMode ? this.searchResultsOpenMap : this.openMap)[path];
          this.bookmarksService.setOpen(path, !isOpen);
        } else {
          openInCurrentTab(bookmark.url!);
        }
      }
    } else if (e.key === 'ArrowUp') {
      if (this.activeIndex === 0) {
        this.activeIndex = this.linearList.length - 1;
      } else {
        this.activeIndex = (this.activeIndex ?? 1) - 1;
      }
    } else if (e.key === 'ArrowDown') {
      if (this.activeIndex === this.linearList.length - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = (this.activeIndex ?? -1) + 1;
      }
    } else if (e.key === 'z' && e.ctrlKey && !this.inSearchMode) {
      const action = this.actionStack[this.actionStack.length - 1];
      if (action) {
        inverseAction(action, this.actionsService, this.settingsService).then(() => {
          this.actionsService.clearCurrentAction();
        });
      }
    } else {
      if (e.key === 'Escape') {
        this.observables.escapeKeyPressed.next(e);
      }

      this.activeIndex = null;
    }

    this.bookmarksService.setActivePath(this.activeIndex === null ? null : this.linearList[this.activeIndex]);
  }
}
