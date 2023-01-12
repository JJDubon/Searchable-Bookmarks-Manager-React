import { useState } from 'react';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { ServiceProvider } from './providers/ServiceProvider';
import { ActionsService } from './services/ActionsService';
import { BookmarksService } from './services/BookmarksService';
import { ContextService } from './services/ContextService';
import { SettingsService } from './services/SettingsService';

interface AppProps {
  bookmarksService: BookmarksService;
  settingsService: SettingsService;
  actionsService: ActionsService;
  contextService: ContextService;
}

function App({ bookmarksService, settingsService, actionsService, contextService }: AppProps) {
  const [showSettings, setShowSettings] = useState(false);
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
