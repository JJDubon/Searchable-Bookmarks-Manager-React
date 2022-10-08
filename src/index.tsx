import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppThemeProvider } from './providers/AppThemeProvider';
import { BookmarksProvider } from './providers/BookmarksProvider';
import { SettingsProvider } from './providers/SettingsProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <SettingsProvider>
        <AppThemeProvider>
          <BookmarksProvider>
            <App />
          </BookmarksProvider>
        </AppThemeProvider>
      </SettingsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
