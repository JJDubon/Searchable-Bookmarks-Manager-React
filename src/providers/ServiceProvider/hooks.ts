import { useContext } from 'react';
import { ServiceProviderContext } from '.';
import { ActionsService } from '../../services/ActionsService';
import { BookmarksService } from '../../services/BookmarksService';
import { ContextService } from '../../services/ContextService';
import { SettingsService } from '../../services/SettingsService';

export function useBookmarksService(): BookmarksService {
  const context = useContext(ServiceProviderContext);
  if (!context) {
    throw new Error('Could not ready ServiceProviderContext');
  }

  return context.bookmarksService;
}

export function useSettingsService(): SettingsService {
  const context = useContext(ServiceProviderContext);
  if (!context) {
    throw new Error('Could not ready ServiceProviderContext');
  }

  return context.settingsService;
}

export function useActionsService(): ActionsService {
  const context = useContext(ServiceProviderContext);
  if (!context) {
    throw new Error('Could not ready ServiceProviderContext');
  }

  return context.actionsService;
}

export function useContextService(): ContextService {
  const context = useContext(ServiceProviderContext);
  if (!context) {
    throw new Error('Could not ready ServiceProviderContext');
  }

  return context.contextService;
}
