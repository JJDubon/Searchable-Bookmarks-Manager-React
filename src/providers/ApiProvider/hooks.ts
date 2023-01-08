import { useContext } from 'react';
import { ApiProviderContext } from '.';
import { BookmarksApi } from '../../apis/BookmarksApi';
import { SettingsApi } from '../../apis/SettingsApi';

export function useBookmarksApi(): BookmarksApi {
  const context = useContext(ApiProviderContext);
  if (!context) {
    throw new Error('Could not ready ApiProviderContext');
  }

  return context.bookmarksApi;
}

export function useSettingsApi(): SettingsApi {
  const context = useContext(ApiProviderContext);
  if (!context) {
    throw new Error('Could not ready ApiProviderContext');
  }

  return context.settingsApi;
}
