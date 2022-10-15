import { useState } from 'react';
import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';
import { SettingsDrawer } from './components/Settings';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
      <SettingsDrawer open={showSettings} hideSettings={() => setShowSettings(false)} />
      <ApplicationFrame header={<Header showSettings={() => setShowSettings(true)} />}>
        <BookmarksContainer />
      </ApplicationFrame>
    </>
  );
}

export default App;
