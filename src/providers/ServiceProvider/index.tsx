import { createContext } from 'react';
import { ActionsService } from '../../services/ActionsService';
import { BookmarksService } from '../../services/BookmarksService';
import { ContextService } from '../../services/ContextService';
import { SettingsService } from '../../services/SettingsService';

interface ContextType {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
  actionsService: ActionsService;
  contextService: ContextService;
}

export const ServiceProviderContext = createContext<ContextType | undefined>(undefined);

interface ServiceProviderProps {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
  actionsService: ActionsService;
  contextService: ContextService;
  children: JSX.Element | JSX.Element[];
}

export const ServiceProvider = ({
  bookmarksService,
  settingsService,
  actionsService,
  contextService,
  children,
}: ServiceProviderProps) => {
  return (
    <ServiceProviderContext.Provider
      value={{ bookmarksService, settingsService, actionsService, contextService }}
    >
      {children}
    </ServiceProviderContext.Provider>
  );
};
