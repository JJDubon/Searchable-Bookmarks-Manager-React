import { DataCleaner } from './data-cleaner';
import { IconLoader } from './icon-loader';

new IconLoader();
new DataCleaner();

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
