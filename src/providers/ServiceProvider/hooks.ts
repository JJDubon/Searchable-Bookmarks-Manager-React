import { useContext } from 'react';
import { ServiceProviderContext } from '.';
import { BookmarksService } from '../../services/BookmarksService';
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
