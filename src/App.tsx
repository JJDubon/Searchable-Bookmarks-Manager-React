import { useState } from 'react';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { useAppIsLoading } from './redux/selectors';

function App() {
  const loading = useAppIsLoading();
  const [showSettings, setShowSettings] = useState(false);

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
