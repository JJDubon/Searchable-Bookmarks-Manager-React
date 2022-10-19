import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { loadBookmarks } from './redux/ducks/bookmarks/actions';
import { BookmarkTreeNode } from './redux/ducks/bookmarks/state';
import { loadSettings } from './redux/ducks/settings/actions';
import { SettingsState } from './redux/ducks/settings/state';
import { useAppIsLoading } from './redux/selectors';

function App() {
  const dispatch = useDispatch();
  const loading = useAppIsLoading();
  const [showSettings, setShowSettings] = useState(false);

  // Initialize the application
  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: 'SBM_POPUP_OPENED' },
      (response?: { root?: BookmarkTreeNode[]; settings?: SettingsState }) => {
        dispatch(loadSettings({ settings: response?.settings }));
        dispatch(loadBookmarks({ root: response?.root }));
      }
    );
  }, [dispatch]);

  if (loading) {
    return <></>;
  }

  return (
    <AppThemeProvider>
      <SettingsDrawer open={showSettings} hideSettings={() => setShowSettings(false)} />
      <ApplicationFrame header={<Header showSettings={() => setShowSettings(true)} />}>
        <BookmarksContainer />
      </ApplicationFrame>
    </AppThemeProvider>
  );
}

export default App;
