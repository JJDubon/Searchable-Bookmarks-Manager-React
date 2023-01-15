import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { buildServices } from './services';

// Note: Awkward to do this here, but this is necessary given how chrome extensions load. Otherwise there will
// be a small box that popups up before the window expands into the full application.
function updateBackground() {
  chrome.storage.local.get('palette', (settings) => {
    if (settings && settings.palette && settings.palette === 'dark') {
      document.body.style.backgroundColor = 'rgba(18, 18, 18, 1)';
    } else {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.015)';
    }

    document.body.style.width = '500px';
    document.body.style.height = '600px';
  });
}

updateBackground();
chrome.storage.local.onChanged.addListener(() => {
  updateBackground();
});

const services = await buildServices();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App {...services} />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
