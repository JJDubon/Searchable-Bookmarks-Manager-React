import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ActionsService } from './services/ActionsService';
import { BookmarksService } from './services/BookmarksService';
import { ContextService } from './services/ContextService';
import { SettingsService } from './services/SettingsService';
import { Settings } from './services/SettingsService/types';

const [settings, tree] = await Promise.all([chrome.storage.local.get(null), chrome.bookmarks.getTree()]);
const settingsService = new SettingsService(settings as Settings);
const bookmarksService = new BookmarksService(tree, settings?.defaultOpenMap ?? {});
const actionsService = new ActionsService();
const contextService = new ContextService();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App
        settingsService={settingsService}
        bookmarksService={bookmarksService}
        actionsService={actionsService}
        contextService={contextService}
      />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
