import { useEffect, useState } from 'react';
import { BookmarksApi } from './apis/BookmarksApi';
import { SettingsApi } from './apis/SettingsApi';
import { Settings } from './apis/SettingsApi/types';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { ApiProvider } from './providers/ApiProvider';
import { AppThemeProvider } from './providers/AppThemeProvider';

function App() {
  const [bookmarksApi, setBookmarksApi] = useState<BookmarksApi | null>(null);
  const [settingsApi, setSettingsApi] = useState<SettingsApi | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const loading = bookmarksApi === null || settingsApi === null;

  useEffect(() => {
    Promise.all([chrome.bookmarks.getTree(), chrome.storage.local.get(null)]).then(([tree, settings]) => {
      const settingsApi = new SettingsApi(settings as Settings);
      const bookmarksApi = new BookmarksApi(tree, settings?.defaultOpenMap ?? {});
      setSettingsApi(settingsApi);
      setBookmarksApi(bookmarksApi);
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <ApiProvider bookmarksApi={bookmarksApi} settingsApi={settingsApi}>
      <AppThemeProvider>
        <SettingsDrawer open={showSettings} hideSettings={() => setShowSettings(false)} />
        <ApplicationFrame header={<Header showSettings={() => setShowSettings(true)} />}>
          <BookmarksContainer />
        </ApplicationFrame>
      </AppThemeProvider>
    </ApiProvider>
  );
}

export default App;
