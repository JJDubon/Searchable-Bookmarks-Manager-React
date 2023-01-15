import { useState } from 'react';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { ServiceProvider } from './providers/ServiceProvider';
import { ServiceList } from './services';

interface AppProps extends ServiceList {}

function App({ ...services }: AppProps) {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <ServiceProvider {...services}>
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
