import { createContext } from 'react';
import { BookmarksService } from '../../services/BookmarksService';
import { SettingsService } from '../../services/SettingsService';

interface ContextType {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
}

export const ServiceProviderContext = createContext<ContextType | undefined>(undefined);

interface ServiceProviderProps {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
  children: JSX.Element | JSX.Element[];
}

export const ServiceProvider = ({ bookmarksService, settingsService, children }: ServiceProviderProps) => {
  return (
    <ServiceProviderContext.Provider value={{ bookmarksService, settingsService }}>
      {children}
    </ServiceProviderContext.Provider>
  );
};
