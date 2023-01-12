import { useEffect, useState } from 'react';
import { BookmarksService } from './services/BookmarksService';
import { SettingsService } from './services/SettingsService';
import { Settings } from './services/SettingsService/types';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { ServiceProvider } from './providers/ServiceProvider';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { ActionsService } from './services/ActionsService';
import { ContextService } from './services/ContextService';

function App() {
  const [bookmarksService, setBookmarksService] = useState<BookmarksService | null>(null);
  const [settingsService, setSettingsService] = useState<SettingsService | null>(null);
  const [actionsService, setActionsService] = useState<ActionsService | null>(null);
  const [contextService, setContextService] = useState<ContextService | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const loading =
    bookmarksService === null || settingsService === null || actionsService == null || contextService == null;

  useEffect(() => {
    chrome.storage.local.get((settings) => {
      const settingsService = new SettingsService(settings as Settings);
      setSettingsService(settingsService);

      chrome.bookmarks.getTree((tree) => {
        const bookmarksService = new BookmarksService(tree, settings?.defaultOpenMap ?? {});
        const actionsService = new ActionsService();
        const contextService = new ContextService();
        setBookmarksService(bookmarksService);
        setActionsService(actionsService);
        setContextService(contextService);
      });
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <ServiceProvider
      bookmarksService={bookmarksService}
      settingsService={settingsService}
      actionsService={actionsService}
      contextService={contextService}
    >
      <AppThemeProvider>
        <SettingsDrawer open={showSettings} hideSettings={() => setShowSettings(false)} />
        <ApplicationFrame header={<Header showSettings={() => setShowSettings(true)} />}>
          <BookmarksContainer />
        </ApplicationFrame>
      </AppThemeProvider>
    </ServiceProvider>
  );
}

export default App;
