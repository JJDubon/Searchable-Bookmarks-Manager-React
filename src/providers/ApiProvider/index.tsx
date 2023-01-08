import { createContext } from 'react';
import { BookmarksApi } from '../../apis/BookmarksApi';
import { SettingsApi } from '../../apis/SettingsApi';

interface ContextType {
  bookmarksApi: BookmarksApi;
  settingsApi: SettingsApi;
}

export const ApiProviderContext = createContext<ContextType | undefined>(undefined);

interface ApiProviderProps {
  bookmarksApi: BookmarksApi;
  settingsApi: SettingsApi;
  children: JSX.Element | JSX.Element[];
}

export const ApiProvider = ({ bookmarksApi, settingsApi, children }: ApiProviderProps) => {
  return (
    <ApiProviderContext.Provider value={{ bookmarksApi, settingsApi }}>
      {children}
    </ApiProviderContext.Provider>
  );
};
