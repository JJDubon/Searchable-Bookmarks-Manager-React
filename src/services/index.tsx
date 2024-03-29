import { ActionsService } from './ActionsService';
import { BookmarksService } from './BookmarksService';
import { ContextService } from './ContextService';
import { KeyboardService } from './KeyboardService';
import { SettingsService } from './SettingsService';
import { Settings } from './SettingsService/types';

export interface ServiceList {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
  actionsService: ActionsService;
  contextService: ContextService;
  keyboardService: KeyboardService;
}

export async function buildServices(): Promise<ServiceList> {
  const [settings, tree] = await Promise.all([chrome.storage.local.get(null), chrome.bookmarks.getTree()]);
  const settingsService = new SettingsService(settings as Settings);
  const bookmarksService = new BookmarksService(tree, settings?.defaultOpenMap ?? {});
  const actionsService = new ActionsService();
  const contextService = new ContextService();
  const keyboardService = new KeyboardService(bookmarksService, settingsService, actionsService);

  return { settingsService, bookmarksService, actionsService, contextService, keyboardService };
}
