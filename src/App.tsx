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

function App() {
  const [bookmarksService, setBookmarksService] = useState<BookmarksService | null>(null);
  const [settingsService, setSettingsService] = useState<SettingsService | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const loading = bookmarksService === null || settingsService === null;

  useEffect(() => {
    Promise.all([chrome.bookmarks.getTree(), chrome.storage.local.get(null)]).then(([tree, settings]) => {
      const settingsService = new SettingsService(settings as Settings);
      const bookmarksService = new BookmarksService(tree, settings?.defaultOpenMap ?? {});
      setSettingsService(settingsService);
      setBookmarksService(bookmarksService);
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <ServiceProvider bookmarksService={bookmarksService} settingsService={settingsService}>
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
